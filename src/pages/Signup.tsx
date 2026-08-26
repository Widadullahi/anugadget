import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(email, password, fullName, birthday, gender || undefined);
    setLoading(false);

    if (error) {
      toast({ title: "Signup failed", description: error.message });
      return;
    }

    toast({ title: "Signup successful", description: "Please check your email to confirm your account." });
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-3">Create an Account</h1>
              <p className="text-muted-foreground mb-6">Sign up to track orders, manage your profile, and save your favorites.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full name</label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Choose a strong password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Birthday</label>
                  <input
                    required
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <div className="flex gap-4 items-center">
                    <label className="inline-flex items-center">
                      <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="gender" value="other" checked={gender === "other"} onChange={() => setGender("other")} />
                      <span className="ml-2">Other</span>
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create account"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
