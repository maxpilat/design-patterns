namespace ProxyPattern {
  interface IService {
    request(): void;
  }

  class OriginalService implements IService {
    request() {
      console.log('OriginalService: Handling request');
    }
  }

  class ProxyService implements IService {
    constructor(private service: IService) {}

    private checkAccess() {
      console.log('ProxyService: Checking access');
      return true;
    }

    request() {
      if (this.checkAccess()) this.service.request();
    }
  }

  (function clientCode() {
    const service = new OriginalService();

    const proxy = new ProxyService(service);

    proxy.request();
  })();
}
