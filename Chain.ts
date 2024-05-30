namespace ChainOfResponsibility {
  enum RequestType {
    InstallationAndSetup,
    Troubleshooting,
    UpdatesAndPatches,
  }

  type TRequest = {
    sender: string;
    message: string;
    type: RequestType;
  };

  interface IHelper {
    help(request: TRequest): void;
    checkRequestType(type: RequestType): boolean;
    setNext(helper: IHelper): void;
  }

  class Helper implements IHelper {
    protected nextHelper!: IHelper;

    constructor(private name: string, private requestType: RequestType) {}

    help(request: TRequest) {
      if (this.checkRequestType(request.type)) {
        console.log(
          `${this.name}: request (${request.message}) from ${request.sender} processed successfully.`
        );
      } else if (this.nextHelper) {
        console.log(
          `${this.name}: request (${request.message}) from ${request.sender} transferred to another helper.`
        );
        this.nextHelper.help(request);
      } else {
        console.log(
          `${this.name}: request (${request.message}) from ${request.sender} cannot be processed.`
        );
      }
    }

    checkRequestType(type: RequestType) {
      return type === this.requestType;
    }

    setNext(helper: IHelper) {
      this.nextHelper = helper;
    }
  }

  (function clientCode() {
    const installationHelper = new Helper(
      'InstallationHelper',
      RequestType.InstallationAndSetup
    );

    const troubleshootingHelper = new Helper(
      'TroubleshootingHelper',
      RequestType.Troubleshooting
    );

    const updateHelper = new Helper(
      'UpdateHelper',
      RequestType.UpdatesAndPatches
    );

    installationHelper.setNext(troubleshootingHelper);
    troubleshootingHelper.setNext(updateHelper);

    const request: TRequest = {
      sender: 'Sam',
      message: 'Hi, how can I update your software to the latest version?',
      type: RequestType.UpdatesAndPatches,
    };

    installationHelper.help(request);
  })();
}
