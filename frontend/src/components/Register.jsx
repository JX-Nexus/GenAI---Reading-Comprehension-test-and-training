import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import authService from "../server/auth"; // Ensure the correct path
import { useNavigate } from "react-router-dom"; // Added for navigation
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";

export function Register() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const password = watch("password");
  const [passwordStrength, setPasswordStrength] = React.useState("Weak");

  React.useEffect(() => {
    setPasswordStrength(getPasswordStrength(password || ""));
  }, [password]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const user = await authService.createAccount(data);
      if (user) {
        setSuccess(true);
        dispatch(login(user));
        setTimeout(() => {
          navigate("/");
        }, 1000); // Delay for a bit to show success message
      } else {
        throw new Error("Registration failed without error message.");
      }
    } catch (error) {
      setError(error.message || "Error creating account. Please try again.");
      console.error("Error creating account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  return (
    <Card className="min-w-fit p-6 shadow-lg rounded-lg border-2 mt-20 border-green-500 bg-white">
      <CardHeader className="bg-white p-4 rounded-t-lg">
        <CardTitle className="text-green-700">Register</CardTitle>
        <CardDescription>Sign up for a new account.</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {error && <p className="text-red-500">{error.message}</p>}
        {success && <p className="text-green-500">Registration successful!</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col w-1/3 space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col w-1/3 space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter your password"
                  className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                />
                <p className="text-sm mt-1">Password Strength: <span className={`font-semibold ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{passwordStrength}</span></p>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div className="flex flex-col w-1/3 space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username", { required: "Username is required" })}
                  placeholder="Enter your username"
                  className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col w-1/3 space-y-1.5">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  {...register("fullname", { required: "Full name is required" })}
                  placeholder="Enter your full name"
                  className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                />
                {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
              </div>
              <div className="flex flex-col w-1/3 space-y-1.5">
                <Label htmlFor="DOB">Date of Birth</Label>
                <Input
                  id="DOB"
                  type="date"
                  {...register("DOB", { required: "Date of Birth is required" })}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out"
                />
                {errors.DOB && <p className="text-red-500">{errors.DOB.message}</p>}
              </div>
              <div className="flex flex-col w-1/3 space-y-1.5">
                <Label htmlFor="preferredReadingTime">Preferred Reading Time (minutes)</Label>
                <Input
                  id="preferredReadingTime"
                  type="number"
                  {...register("preferredReadingTime", { required: "Preferred reading time is required" })}
                  placeholder="Enter your preferred reading time"
                  className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                />
                {errors.preferredReadingTime && <p className="text-red-500">{errors.preferredReadingTime.message}</p>}
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col w-1/3 space-y-1.5">
                <Label htmlFor="occupation">Occupation</Label>
                <Select
                  id="occupation"
                  {...register("occupation", { required: "Occupation is required" })}
                  onValueChange={(value) => setValue("occupation", value)}
                  className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your occupation" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.occupation && <p className="text-red-500">{errors.occupation.message}</p>}
              </div>
              {watch("occupation") === "student" && (
                <div className="flex flex-col w-1/3 space-y-1.5">
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    {...register("class")}
                    placeholder="Enter your class"
                    className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                  />
                </div>
              )}
              {watch("occupation") === "professional" && (
                <div className="flex flex-col w-1/3 space-y-1.5">
                  <Label htmlFor="field">Field</Label>
                  <Input
                    id="field"
                    {...register("field")}
                    placeholder="Enter your field"
                    className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                  />
                </div>
              )}
              {watch("occupation") === "other" && (
                <div className="flex flex-col w-1/3 space-y-1.5">
                  <Label htmlFor="details">Details</Label>
                  <Input
                    id="details"
                    {...register("details")}
                    placeholder="Please enter details"
                    className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                  />
                </div>
              )}
            </div>
          </div>
          <CardFooter className="bg-white p-4 rounded-b-lg flex justify-between">
            <Button variant="outline" className="border border-green-500 text-green-500 hover:bg-green-50">Cancel</Button>
            <Button type="submit" className={`bg-green-500 text-white hover:bg-green-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'Register'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
