"use server"

import { IFailResLogin, ILoginValues, ISucsessResLogin } from "@/interface/ILogin";

export default async function LoginAcion(values:ILoginValues){
     const response = await fetch(
          `${process.env.API_URL}/users/signIn`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data: ISucsessResLogin | IFailResLogin = await response.json();
        return data
}