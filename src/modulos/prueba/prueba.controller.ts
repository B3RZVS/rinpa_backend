import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Post,Put, Query, UseGuards} from '@nestjs/common';
import { PruebaService} from './prueba.service';
import { CreatePruebaDto } from './dto/create-prueba.dto';
import { PruebaGuard } from './guards/prueba/prueba.guard';

// El controler maneja las peticiones HTTP, por lo que maneja las request
@Controller({})
export class PruebaController {

    constructor (private pruebas:PruebaService ){}   

    @Get('/prueba')
    @UseGuards(PruebaGuard)
    getAllPrueba(){
        return this.pruebas.getPruebas();
    }

    @Get("/:id")
    getPrueba(@Param('id', ParseIntPipe) id:number){ 
        return this.pruebas.getPrueba(id)
    }

    @Get("/notFound")
    @HttpCode(404)
    notFound(){
        return "404 page notFound"
    }

    @Post('/prueba')
    createPrueba(@Body() prueba:CreatePruebaDto){

        return this.pruebas.postPrueba(prueba)
    }

    @Put("/prueba")
    updatePrueba( @Query() query:any){
        console.log(query)

    }
    @Patch("/prueba")
    patchPrueba(){

    }
}
