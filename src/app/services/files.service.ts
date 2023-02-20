import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap, map } from 'rxjs/operators';
import { IFile } from './../models/File'
import { saveAs } from 'file-saver'
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor (
    private http: HttpClient
  ) { }

  getFile(file: IFile) {
    return this.http.get(file.url, { responseType: 'blob' })
      .pipe(
        tap(
          (content) => {
            const blob = new Blob([content], { type: file.type })
            saveAs(blob, file.name)
          }
        ),
        map(() => true)
      )
  }
}
