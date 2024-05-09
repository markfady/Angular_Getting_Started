import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl:'./star.component.html',
    styleUrls: ['./star.component.css']

})
export class StarComponent implements OnChanges{ //your first nested component
    @Input() rating:number=0; 
    cropWidth:number=75;
    ngOnChanges(): void {
        this.cropWidth=this.rating*75/5;
    }
    //to send data to the container
    @Output() ratingClicked:EventEmitter<string>=new EventEmitter<string>() 
    onClick():void{
    this.ratingClicked.emit(`this is ${this.rating} stars`)
    }
}