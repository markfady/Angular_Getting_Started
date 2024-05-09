import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'convertToSpaces' //The name used to pass the character using it
})

export class ConvertToSpacesPipe implements PipeTransform{
    transform(value: string, character:string):string {
        return value.replace(character,' ');
    }
}