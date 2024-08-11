import { axiosInstance } from "../services/axiosConfig.service";

export interface MetodhHttp<T, D> {
    findAll<R = T[]>(): Promise<R>;
    findOne<R = T, W = D>(id: W | null): Promise<R | null>;
    create<Req = T, Res = T>(data: Req): Promise<Res>;
    update<W = D, Req = T, Res = T>(id: W | null, data: Partial<Req>): Promise<Res>;
    delete(id: D): Promise<void>;
}

class Https {
  protected baseUrl!: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async httpGet<T>(url: string | null): Promise<T> {
    try {
      const res = await axiosInstance.get<T>(`${this.baseUrl}${url}`);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * T result
   * D data
   * @param url 
   * @param data 
   * @returns 
   */
  async httpPost<T, D>(url: string, data: D): Promise<T> {
    try {
      const res = await axiosInstance.post<T>(`${this.baseUrl}/${url}`, data);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async httpUpdate<T, D>(url: string, data: D): Promise<T> {
    try {
      const res = await axiosInstance.put<T>(`${this.baseUrl}/${url}`, data);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async httpDelete<T>(url: string): Promise<T> {
    try {
      const res = await axiosInstance.delete<T>(`${this.baseUrl}${url}`);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    // Manejo de errores centralizado
    // Puedes agregar más lógica de manejo de errores aquí
    console.error('Unexpected error:', error);
    throw error;
  }
}

export class AppServices<T, D> extends Https implements MetodhHttp<T, D> {
  private url = "";

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  setUrl(url: string) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }

  async findAll<R = T[]>(): Promise<R> {
    return this.httpGet<R>(this.url);
  }

  async findOne<R = T, W = D>(id: W | null): Promise<R | null> {
    return this.httpGet<R>(`${this.url}${id}`);
  }

  async create<Req = T, Res = T>(data: Req): Promise<Res> {
    return this.httpPost<Res, Req>(this.url, data);
  }

  async update<W = D, Req = T, Res = T>(id: W, data: Partial<Req>): Promise<Res> {
    return this.httpUpdate<Res, Partial<Req>>(`${this.url}/${id}`, data);
  }

  async delete(id: D): Promise<void> {
    await this.httpDelete<void>(`${this.url}/${id}`);
  }
}

export default Https;
