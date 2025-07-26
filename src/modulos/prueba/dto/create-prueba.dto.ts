import { IsInt, IsNotEmpty, IsNumber, isNumber, IsString, Min, MinLength } from "class-validator";


export class CreatePruebaDto{

    @IsNumber()
    @IsNotEmpty() //Para que no este vacio
    id:number;

    @IsString()
    @MinLength(1)
    nombre:string;
}