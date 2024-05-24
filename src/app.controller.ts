import { Controller, Get, Req, Res, Post, UseInterceptors } from "@nestjs/common";
import { AppInterceptor } from "./app.interceptor";
import { Request, Response } from "express";
import { AppService } from "./app.service";


@Controller("app")
export class AppController {
    constructor(private AppService: AppService) { }
    @Get('')
    // @UseInterceptors(AppInterceptor)
    helloworld(): any {
        return this.AppService.getHello()
    }
}