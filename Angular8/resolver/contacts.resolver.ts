@Injectable()
class ContactsResolver implements Resolve<ContactInterface[]> {
  constructor(private contactService: ContactService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.contactService.getById(route.params['id']);
  }
}
