"use server"

import { IFailSignupRes, IRegisterValues, ISucessSignupRes } from "@/interface/ISignup";

export default async function RegisterAcion(values:IRegisterValues){
     const response = await fetch(
          `${process.env.API_URL}/users/signUp`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data: ISucessSignupRes | IFailSignupRes = await response.json();
        return data
}