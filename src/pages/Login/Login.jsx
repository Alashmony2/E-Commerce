import {Input,Button} from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import {autContext} from "../../contexts/autContext"; 
import * as Yup from "yup"



export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, seterrMsg] = useState("")
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(autContext);

  const initialValues = {
    email:"",
    password:"",
  }

  function onSubmit(values) {
    setIsLoading(true);
    seterrMsg("");
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        if(data.message === "success"){
          setIsLoggedIn(true);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        seterrMsg(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  


  const validationSchema = Yup.object({
    email:Yup.string().required("Email is required").email("Invalid Email"),
    password:Yup.string().required("Password is required").min(8,"Password must be at least 8 characters")
  })
  
  const {values , handleChange , handleSubmit, errors, touched, handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  
  return (
    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-3xl font-bold">Login Now</h1>
      <form onSubmit={handleSubmit} >
        <div className="py-5 grid gap-4">
          <Input isInvalid={touched.email && errors.email} errorMessage={errors.email}  name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}  label="Email" type="email" variant="bordered" />
          <Input isInvalid={touched.password && errors.password} errorMessage={errors.password}  name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}  label="Password" type="password" variant="bordered" />
          <Button type="submit"  isLoading={isLoading} color="primary">Login</Button>
          {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
        </div>
      </form>
      
    </div>
  )
}
