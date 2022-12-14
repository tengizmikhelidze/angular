import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  template: ` <main [routerLink]="'/app'">
    <div>
      <h1>YOU SHALL NOT PASS!</h1>
      <br />
      <h3>Error 404, Page Not Found!</h3>
      <br />
      <h3>Click Image To Return Home Page</h3>
      <br />
      <img
        src="./assets/images/page-not-found/nf-404.png"
        width="284"
        height="349"
      />
    </div>
  </main>`,
  styles: [
    `
      main {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(154, 154, 154);
        background: linear-gradient(
          0deg,
          rgba(154, 154, 154, 1) 0%,
          rgba(226, 225, 225, 1) 40%,
          rgba(254, 254, 254, 1) 60%,
          rgba(254, 254, 254, 1) 100%
        );
      }

      div {
        text-align: center;
        pointer-events: none;
        user-select: none;
      }

      img {
        width: 100%;
        height: auto;
      }
    `,
  ],
  imports: [RouterLink],
})
export class PageNotFoundComponent {}
