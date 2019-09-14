import { Component, OnInit } from '@angular/core';
import { MyCarsService } from '../../services/my-cars.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.scss']
})
export class MyCarsComponent implements OnInit {
  cars = [];
  public loading = 0;
  constructor(
    private mCarsService: MyCarsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading++;
    this.mCarsService.list().subscribe(
      res => {
        this.cars = res;
        this.loading--;
      },
      err => {
        console.log("Error occured");
        this.loading--;
      });
  }
  swipe(eType) {
    console.log('mycars', eType)
  }
  public removeCar(id, index, event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationComponent, {

    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.mCarsService.removeCar(id).subscribe(
          res => {
            this.snackBar.open("Successfully deleted", "Dismiss", {
              duration: 2000
            });
            console.log(res);
          },
          err => {
            this.snackBar.open("Error in deletion", "Dismiss", {
              duration: 2000
            });
            console.log(err);
          });
        this.cars.splice(index, 1);
      }
    });
  }

}
