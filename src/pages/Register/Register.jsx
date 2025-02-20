import {Input,Button} from "@heroui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"


export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, seterrMsg] = useState("")
  const navigate = useNavigate()

  const initialValues = {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  }

  function onSubmit(values) {
    setIsLoading(true);
    seterrMsg("");
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        if(data.message === "success"){
          navigate("/login");
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
    name:Yup.string().required("Name is required").min(3,"Name must be at least 3 characters").max(20,"Name must be at most 20 characters"),
    email:Yup.string().required("Email is required").email("Invalid Email"),
    password:Yup.string().required("Password is required").min(8,"Password must be at least 8 characters"),
    rePassword:Yup.string().required("RePassword is required").oneOf([Yup.ref("password")]),
    phone:Yup.string().required("Phone is required").matches(/01[0125][0-9]{8}$/,"Invalid phone number")
  })
  
  const {values , handleChange , handleSubmit, errors, touched, handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  
  return (
    <div className="sm:w-2/3 mx-auto">
      <h1 className="text-3xl font-bold">Register Now</h1>
      <form onSubmit={handleSubmit} >
        <div className="py-5 grid md:grid-cols-2 gap-4">
          <Input isInvalid={touched.name && errors.name} errorMessage={errors.name} name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="Name" type="text" variant="bordered" />
          <Input isInvalid={touched.email && errors.email} errorMessage={errors.email}  name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="Email" type="email" variant="bordered" />
          <Input isInvalid={touched.password && errors.password} errorMessage={errors.password}  name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className="" label="Password" type="password" variant="bordered" />
          <Input isInvalid={touched.rePassword && errors.rePassword} errorMessage={errors.rePassword}  name="rePassword" value={values.rePassword} onChange={handleChange} onBlur={handleBlur} className="" label="RePassword" type="password" variant="bordered" />
          <Input isInvalid={touched.phone && errors.phone} errorMessage={errors.phone}  name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="Phone" type="tel" variant="bordered" />
          <Button type="submit" className="md:col-span-2" isLoading={isLoading} color="primary">Register</Button>
          {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
        </div>
      </form>
      
    </div>
  )
}
