import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import "./LoginForm.css";
// FORM SCHEMA
const formSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  username: z.string().min(2).max(30),
  yearOfCollege: z.number().max(6).min(1),
  branch: z.string().max(50),
  skills: z.string(),
  email: z.string().email(),
  password: z.string().refine(
    (val) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      return regex.test(val);
    },
    {
      message:
        "'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
    }
  ),
});
//   FUNCTIONS
const onSubmit = (data) => {
  console.log(data);
};
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* First Name */}
      <label>
        First Name:
        <input {...register("firstname")} />
      </label>
      {errors.firstname && <p>{errors.firstname.message}</p>}

      {/* Last Name */}
      <label>
        Last Name:
        <input {...register("lastname")} />
      </label>
      {errors.lastname && <p>{errors.lastname.message}</p>}

      {/* Username */}
      <label>
        Username:
        <input {...register("username")} />
      </label>
      {errors.username && <p>{errors.username.message}</p>}

      {/* Year of College */}
      <label>
        Year of College:
        <input
          type="number"
          {...register("yearOfCollege", {
            valueAsNumber: true,
          })}
        />
      </label>
      {errors.yearOfCollege && <p>{errors.yearOfCollege.message}</p>}

      {/* Branch */}
      <label>
        Branch:
        <input {...register("branch")} />
      </label>
      {errors.branch && <p>{errors.branch.message}</p>}

      {/* Skills */}
      <label>
        Skills:
        <input {...register("skills")} />
      </label>
      {errors.skills && <p>{errors.skills.message}</p>}

      {/* Email */}
      <label>
        Email:
        <input type="email" {...register("email")} />
      </label>
      {errors.email && <p>{errors.email.message}</p>}

      {/* Password */}
      <label>
        Password:
        <input type="password" {...register("password")} />
      </label>
      {errors.password && <p>{errors.password.message}</p>}

      {/* Submit Button */}
      <input type="submit" />
    </form>
  );
}

export default LoginForm;
