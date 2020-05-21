import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from "@angular/router";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Transactions } from "src/app/dto";
import { ApiService } from "src/app/services";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-network-nodes",
  templateUrl: "network-nodes-grid.component.html",
  styleUrls: ["network-nodes-grid.component.scss"],
})
export class NetworkNodesGridComponent implements OnInit {
  @ViewChild("registerModal") public registerModal: ElementRef;
  public idBlock: number | undefined = undefined;
  public transactions: Transactions[];
  public modelGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private modalService: NgbModal
  ) {}

  public ngOnInit(): void {
    this.modelGroup = this.formBuilder.group({
      networknodeurl: ["", Validators.required],
    });
    this.apiService.getNetworkNodes().then((r) => {
      this.transactions = r;
      console.log(r);
    });
  }

  public openModal(): void {
    this.modalService.open(this.registerModal, { centered: true });
  }
  public registerNetwork(): void {
    const formData = this.modelGroup.getRawValue();
    console.log(formData);
    this.apiService.postNetworkNodes(formData);
  }
}
