import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';

@Component({
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    selector: 'app-header'
}
)
export class HeaderComponent {
    collapsed = true;
    @Output() componentSelected: EventEmitter<String> = new EventEmitter();
    

    onSelect(elementSelected:string) {
        this.componentSelected.emit(elementSelected);
    }

    
}
