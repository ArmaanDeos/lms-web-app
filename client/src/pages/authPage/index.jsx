import CommonForm from "@/components/commonForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControllers, signUpFormControllers } from "@/config";
import { AuthContext } from "@/context/authContext/AuthContext";
import { GraduationCap } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [activeTabs, setActiveTabs] = useState("signin");

  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);

  const handleTabChange = (value) => {
    setActiveTabs(value);
  };

  const checkIfSignInFormIsValid = () => {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  };

  const checkIfSignUpFormIsValid = () => {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  };
  // console.log(singInFormData);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="relative z-20 px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center" to={"/"}>
          <GraduationCap className="h-8 w-8 mr-2" />
          <span className="font-extrabold text-xl">TechTeleios - LEARN</span>
        </Link>
      </header>

      {/* Content Section */}
      <div className="relative z-20 flex flex-1 items-center justify-center">
        <Tabs
          className="w-full max-w-md bg-white/90 rounded-md shadow-md p-6"
          value={activeTabs}
          defaultValue="signin"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControllers}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  buttonText="Sign In"
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleFormSubmit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your email and password to create a new account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControllers}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  buttonText={"Sign Up"}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleFormSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
