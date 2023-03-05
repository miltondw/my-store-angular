import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap, map } from 'rxjs/operators';
import { IFile, IFileImg } from './../models/File'
import { saveAs } from 'file-saver'
import { environment } from './../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private url: string = `${environment.API_URL}/files`
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
  uploadFile(file: Blob) {
    const dto = new FormData()
    dto.append('file', file)
    return this.http.post<IFileImg>(`${this.url}/upload`, dto)
  }
}
