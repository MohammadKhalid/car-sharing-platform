import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../services/invoice';
import { PaymentsService } from '../../services/payments.service';
import { TitleService } from '../../services/title.service';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private paymentsService: PaymentsService, private titleService: TitleService) { }
  payments: Array<Invoice> = [];
  fileToUpload: File = null;
  public loading: number = 0;
  ngOnInit() {
    this.loading++;
    this.paymentsService.list().subscribe(
      res => {
        this.loading--;
        this.payments = res;
      },
      err => {
        this.loading--;
        console.log("Error occured");
      });
    this.titleService.change("My Payments")
  }
  handleFileInput(files: FileList) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.fileToUpload = event.target.result;
    }
    reader.readAsDataURL(file);

  }
  uploadFile(date, index) {
    var data = {
      date: date,
      image: this.fileToUpload
    }
    this.paymentsService.postFile(data).subscribe(data => {
      this.payments[index].screenshot = "changed";
      this.fileToUpload = null;
    }, error => {
      console.log(error);
    });
  }


}
