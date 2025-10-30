import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ListTodo } from "lucide-react";
import { Button } from "../ui/button";
import {
    Card, CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Footer from "../general/Footer";
import { loginSchema, type LoginForm } from "../../lib/validation";
import { isAuthenticated, setSession } from "../../lib/auth";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) navigate("/dashboard", { replace: true });
    }, [navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (data.email && data.password.length >= 6) {
            setSession({
                id: Math.random().toString(36).substring(2),
                email: data.email,
                name: data.email.split("@")[0],
            });

            toast.success("Login successful!", {
                description: "Welcome back to TicketApp",
            });

            navigate("/dashboard");
        } else {
            toast.error("Invalid credentials", {
                description: "Please check your email and password",
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Navbar */}
            <header className="border-b bg-card">
                <nav className="container max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <Link to="/" className="flex items-center gap-2">
                        <ListTodo className="w-6 h-6 text-primary" />
                        <span className="text-xl font-semibold">TicketApp</span>
                    </Link>
                </nav>
            </header>

            {/* Login Section */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email")}
                                    className={errors.email ? "border-destructive" : ""}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className={errors.password ? "border-destructive" : ""}
                                />
                                {errors.password && (
                                    <p className="text-sm text-destructive">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>

                        {/* Signup Link */}
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-primary hover:underline font-medium"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
