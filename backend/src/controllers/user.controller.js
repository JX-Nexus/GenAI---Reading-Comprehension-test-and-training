import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {User} from '../models/user.model.js';
import {
    uploadFileOnCloudinary,
    deleteFileFromCloudinary,
} from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {FOLDER} from '../constants.js';

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(
            500,
            `Something went wrong while generation access and refresh token's`
        );
    }
};

function generateDefaultAvatar(fullname) {
    return fullname.charAt(0).toUpperCase();
}

const registerUser = asyncHandler(async (req, res) => {
    const {fullname, email, username, password, occupation, preferredeReadingTime} = req.body;

    if (
        [fullname, email, username, password, occupation,preferredeReadingTime ].some(
            (field) => field?.trim === ''
        )
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}],
    });

    if (existedUser) {
        throw new ApiError(
            409,
            'User with this username or email already exists'
        );
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        avatarLocalPath = generateDefaultAvatar(fullname)
    }

    // upload avatar to cloudinary
    const avatar = await uploadFileOnCloudinary(avatarLocalPath, FOLDER.USERS);
    const coverImage = await uploadFileOnCloudinary(
        coverImageLocalPath,
        FOLDER.USERS
    );

    if (!avatar) {
        throw new ApiError(400, 'Error while uploading avatar');
    }

    const user = await User.create({
        fullname,
        email,
        username,
        password,
        occupation,
        preferredeReadingTime,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
    });

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            'Something went wrong while registering the user'
        );
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, 'User created successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body;

    if (!(email)) {
        throw new ApiError(400, 'Username or email is required');
    }

    const user = await User.findOne({
        $or: [{username}, {email}],
    });

    if (!user) {
        throw new ApiError(
            404,
            "User doesn't exists with given username or email"
        );
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid user credentials!');
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        '-password -refreshToken'
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: accessToken,
                    refreshToken,
                    loggedInUser,
                },
                'User loggedIn successfully'
            )
        );
});

export{
    registerUser,
    loginUser,
}