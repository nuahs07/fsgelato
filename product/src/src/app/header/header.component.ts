import { Component, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { Menu } from '../model/menu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true, // <-- Make sure this is true
  imports: [
      CommonModule,
      RouterModule // <-- Add RouterModule here
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  public menus: Menu[] = []

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
      this.menuService.getData().subscribe(data => {this.menus = data; });
  }
}
