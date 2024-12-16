import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { ShareByData, ShareByNavigatorData } from '@app/interfaces/share-by.interface';
import { ShareBy } from '@app/types/share.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private rendererFactory2: RendererFactory2;
  private _renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId: string,
    private readonly injector: Injector,
  ) {}

  get document(): Document {
    return this._document;
  }

  get isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get renderer(): Renderer2 {
    if (!this._renderer) {
      this._renderer = this.crearRenderer();
    }

    return this._renderer;
  }

  loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Script load error for ${src}`));

      this.document.getElementsByTagName('head')[0].appendChild(script);
    });
  }

  navigateToExternalUrl(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  generateId(idx?: number): string {
    const timestamp = new Date().getTime().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    const indexPart = idx ? (idx * Math.random()).toString(36).substring(2, 10) : 0;

    return (timestamp + randomPart + indexPart).substring(0, 16);
  }

  getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          },
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  async shareLinkByNavigator({ title, text, url }: ShareByNavigatorData) {
    try {
      navigator.share({ title, text, url });
    } catch (err) {
      throw new Error(`Error on share: ${err.message}`);
    }
  }

  shareLink(shareBy: ShareBy, data: ShareByData) {
    if (shareBy === 'whatsapp') {
      this.shareOnWhatsApp(data.whatsAppText);
    } else if (shareBy === 'facebook') {
      this.shareOnFacebook(data.url);
    } else if (shareBy === 'x') {
      this.shareOnX(data.url, data.xMsg);
    } else if (shareBy === 'email') {
      this.shareByEmail(data.mailtoSubject, data.mailtoBody);
    }
  }

  calculateDaysBetweenDates(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMilliseconds = end.getTime() - start.getTime();
    const daysDifference = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  getDatesArray(startDate: Date, endDate: Date): Date[] {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const datesArray = [];

    const currentDate = new Date(start);

    while (currentDate <= end) {
      datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  }

  getDateFromStart(startDate: Date, daysNum: number): Date {
    const fecha = new Date(startDate);
    fecha.setDate(fecha.getDate() + daysNum);
    return fecha;
  }

  private shareOnWhatsApp(text: string) {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

    this.navigateToExternalUrl(whatsappUrl);
  }

  private shareOnFacebook(url: string) {
    if (this.validateUrl(url)) {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

      this.navigateToExternalUrl(fbUrl);
    } else {
      throw new Error(`Invalid URL: ${url}`);
    }
  }

  private shareOnX(url: string, message: string) {
    if (this.validateUrl(url)) {
      const encodedMessage = encodeURIComponent(message);
      const encodedUrl = encodeURIComponent(url);
      const xUrl = `https://x.com/intent/post?text=${encodedMessage}+${encodedUrl}`;

      this.navigateToExternalUrl(xUrl);
    } else {
      throw new Error(`Invalid URL: ${url}`);
    }
  }

  private shareByEmail(mailtoSubject: string, mailtoBody: string) {
    const mailtoURL = `mailto:?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

    this.navigateToExternalUrl(mailtoURL);
  }

  private getRendererFactory(): RendererFactory2 {
    if (!this.rendererFactory2) {
      this.rendererFactory2 = this.injector.get(RendererFactory2);
    }

    return this.rendererFactory2;
  }

  private crearRenderer(): Renderer2 {
    return this.getRendererFactory().createRenderer(null, null);
  }

  private validateUrl(url: string): boolean {
    const validUrlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/gm;
    const allowedDomains = ['www.tripilog.com'];

    try {
      const parsedUrl = new URL(url);
      return validUrlPattern.test(url) && allowedDomains.includes(parsedUrl.hostname);
    } catch {
      return false;
    }
  }
}
