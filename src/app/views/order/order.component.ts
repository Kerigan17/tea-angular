import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {valuesValidator} from "../../shared/directives/values-validator.directive";
import {CartService} from "../../shared/services/cart.service";
import {CountriesService} from "../../shared/services/countries.service";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  sendFormGroup = this.fb.group({
    product: ['', [Validators.required]],
    comment: [''],
    name: ['', [Validators.required, valuesValidator('^[A-ZА-Я][a-zа-я]')]],
    last_name: ['', [Validators.required, valuesValidator('^[A-ZА-Я][a-zа-я]')]],
    phone: ['', [Validators.required, valuesValidator('^[\\+]?[0-9]{11}$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required, valuesValidator('^[0-9]*$')]],
    address: ['', [Validators.required, valuesValidator('^[A-zА-я0-9\\s\\-\\\\]+$')]]
  })

  public name: AbstractControl = this.sendFormGroup.get('name') as AbstractControl;
  public last_name: AbstractControl = this.sendFormGroup.get('last_name') as AbstractControl;
  public phone: AbstractControl = this.sendFormGroup.get('phone') as AbstractControl;
  public country: AbstractControl = this.sendFormGroup.get('country') as AbstractControl;
  public zip: AbstractControl = this.sendFormGroup.get('zip') as AbstractControl;
  public address: AbstractControl = this.sendFormGroup.get('address') as AbstractControl;

  private productElement: HTMLInputElement | null = null;
  private subscriptionOrder: Subscription | null = null;
  public showForm: boolean = true;
  public showFThanks: boolean = false;
  public error: boolean = false;
  public countries: string[] = []
  constructor(private cartService: CartService,
              private fb: FormBuilder,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.countries = CountriesService.getCountries();
    this.productElement = document.getElementById('product') as HTMLInputElement;

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['title']) {
        this.sendFormGroup.patchValue({
          product: params['title']
        })

      }
    })
  }

  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }

  sendForm() {
    console.log(this.sendFormGroup.valid);
    console.log(this.sendFormGroup.value);

    if (this.sendFormGroup.valid) {
      this.subscriptionOrder = this.cartService.createOrder({
        name: this.sendFormGroup.get('name')?.value as string,
        last_name: this.sendFormGroup.get('last_name')?.value as string,
        phone: this.sendFormGroup.get('phone')?.value as string,
        country: this.sendFormGroup.get('country')?.value as string,
        zip: this.sendFormGroup.get('zip')?.value as string,
        product: this.sendFormGroup.get('product')?.value as string,
        address: this.sendFormGroup.get('address')?.value as string,
        comment: this.sendFormGroup.get('comment')?.value as string,
      })
        .subscribe((response: { success: number, message?: string}) => {
          if (response.success == 1 && !response.message) {
            this.showForm = false;
            this.showFThanks = true;
          } else {
            this.error = true;
          }
        })
    } else {
      alert('Заполните все поля')
    }
  }
}
