import { Controller, Req, Res, Post, UseInterceptors } from "@nestjs/common";
import { AppInterceptor } from "./app.interceptor";
import { Request, Response } from "express";


@Controller("app")
export class AppController {
    @Post('')
    @UseInterceptors(AppInterceptor)
    helloworld(): any {
        return
    }
}