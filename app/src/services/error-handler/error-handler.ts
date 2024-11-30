export class ErrorHandler {
  static handleError(error: unknown) {
    // Error could've been sent to error tracker service (Sentry, TrackJS...)
    console.error(error);
  }
}
