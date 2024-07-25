import React from 'react'
import { useState } from "react";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slice/authSlice";



function Login() {
    const handleSubmit = {

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");

    return (
      <div className="login-container d-flex justify-content-center align-items-center h-100">
        <Card className="min-w-fit p-6 shadow-lg rounded-lg border-2 border-green-500 bg-white">
          <CardHeader className="bg-white p-4 rounded-t-lg">
            <CardTitle className="text-green-700">Login</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border rounded-md p-2 focus:outline-none focus:border-green-500"
                />
              </div>
              <CardFooter className="bg-white p-4 rounded-b-lg d-flex justify-content-end">
                <Button
                  type="submit"
                  className={`bg-green-500 text-white hover:bg-green-600 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : 'Register'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
export default Login
