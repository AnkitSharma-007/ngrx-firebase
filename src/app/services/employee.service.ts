import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Employee } from "src/models/employee";
import { City } from "src/models/city";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private db: AngularFirestore) {}

  getCityList(): Observable<City[]> {
    const cityList = this.db
      .collection<City>("City")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            cityId: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      );
    return cityList;
  }

  saveEmployee(employee: Employee) {
    const employeeData = JSON.parse(JSON.stringify(employee));
    return this.db.collection("Employee").add(employeeData);
  }

  getAllEmployees(): Observable<Employee[]> {
    const employeeList = this.db
      .collection<Employee>("Employee")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((c) => ({
            employeeId: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      );
    return employeeList;
  }

  getEmployeeById(employeeId: string): Observable<Employee> {
    const employeeData = this.db
      .doc<Employee>("Employee/" + employeeId)
      .valueChanges();
    return employeeData;
  }

  updateEmployee(employeeId: string, employee: Employee) {
    const employeeData = JSON.parse(JSON.stringify(employee));
    return this.db.doc("Employee/" + employeeId).update(employeeData);
  }

  deleteEmployee(employeeId: string) {
    return this.db.doc("Employee/" + employeeId).delete();
  }
}
