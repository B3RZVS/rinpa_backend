import { Injectable, HttpCode, NotFoundException } from '@nestjs/common';
import { CreatePruebaDto } from './dto/create-prueba.dto';



@Injectable()
export class PruebaService {

    private prueba: CreatePruebaDto[] = []

    getPruebas() {
        return this.prueba
    }

    getPrueba(id:number){
        const tareaEncontrada= this.prueba.find(p => p.id === id)

        if(!tareaEncontrada){
            return new NotFoundException(`La Tarea con el id ${id} no fue encontrada`)
        }
        return tareaEncontrada
    }

    postPrueba(prueba:CreatePruebaDto){
        this.prueba.push(prueba)
        return prueba

    }
}
