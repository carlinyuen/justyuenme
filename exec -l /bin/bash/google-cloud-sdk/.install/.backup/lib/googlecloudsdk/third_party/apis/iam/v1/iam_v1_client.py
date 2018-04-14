"""Generated client library for iam version v1."""
# NOTE: This file is autogenerated and should not be edited by hand.
from apitools.base.py import base_api
from googlecloudsdk.third_party.apis.iam.v1 import iam_v1_messages as messages


class IamV1(base_api.BaseApiClient):
  """Generated client library for service iam version v1."""

  MESSAGES_MODULE = messages
  BASE_URL = u'https://iam.googleapis.com/'

  _PACKAGE = u'iam'
  _SCOPES = [u'https://www.googleapis.com/auth/cloud-platform']
  _VERSION = u'v1'
  _CLIENT_ID = '1042881264118.apps.googleusercontent.com'
  _CLIENT_SECRET = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _USER_AGENT = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _CLIENT_CLASS_NAME = u'IamV1'
  _URL_VERSION = u'v1'
  _API_KEY = None

  def __init__(self, url='', credentials=None,
               get_credentials=True, http=None, model=None,
               log_request=False, log_response=False,
               credentials_args=None, default_global_params=None,
               additional_http_headers=None, response_encoding=None):
    """Create a new iam handle."""
    url = url or self.BASE_URL
    super(IamV1, self).__init__(
        url, credentials=credentials,
        get_credentials=get_credentials, http=http, model=model,
        log_request=log_request, log_response=log_response,
        credentials_args=credentials_args,
        default_global_params=default_global_params,
        additional_http_headers=additional_http_headers,
        response_encoding=response_encoding)
    self.iamPolicies = self.IamPoliciesService(self)
    self.organizations_roles = self.OrganizationsRolesService(self)
    self.organizations = self.OrganizationsService(self)
    self.permissions = self.PermissionsService(self)
    self.projects_roles = self.ProjectsRolesService(self)
    self.projects_serviceAccounts_keys = self.ProjectsServiceAccountsKeysService(self)
    self.projects_serviceAccounts = self.ProjectsServiceAccountsService(self)
    self.projects = self.ProjectsService(self)
    self.roles = self.RolesService(self)

  class IamPoliciesService(base_api.BaseApiService):
    """Service class for the iamPolicies resource."""

    _NAME = u'iamPolicies'

    def __init__(self, client):
      super(IamV1.IamPoliciesService, self).__init__(client)
      self._upload_configs = {
          }

    def QueryAuditableServices(self, request, global_params=None):
      """Returns a list of services that support service level audit logging.
configuration for the given resource.

      Args:
        request: (QueryAuditableServicesRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (QueryAuditableServicesResponse) The response message.
      """
      config = self.GetMethodConfig('QueryAuditableServices')
      return self._RunMethod(
          config, request, global_params=global_params)

    QueryAuditableServices.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'iam.iamPolicies.queryAuditableServices',
        ordered_params=[],
        path_params=[],
        query_params=[],
        relative_path=u'v1/iamPolicies:queryAuditableServices',
        request_field='<request>',
        request_type_name=u'QueryAuditableServicesRequest',
        response_type_name=u'QueryAuditableServicesResponse',
        supports_download=False,
    )

  class OrganizationsRolesService(base_api.BaseApiService):
    """Service class for the organizations_roles resource."""

    _NAME = u'organizations_roles'

    def __init__(self, client):
      super(IamV1.OrganizationsRolesService, self).__init__(client)
      self._upload_configs = {
          }

    def Create(self, request, global_params=None):
      """Creates a new Role.

      Args:
        request: (IamOrganizationsRolesCreateRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Create')
      return self._RunMethod(
          config, request, global_params=global_params)

    Create.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/organizations/{organizationsId}/roles',
        http_method=u'POST',
        method_id=u'iam.organizations.roles.create',
        ordered_params=[u'parent'],
        path_params=[u'parent'],
        query_params=[],
        relative_path=u'v1/{+parent}/roles',
        request_field=u'createRoleRequest',
        request_type_name=u'IamOrganizationsRolesCreateRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      """Soft deletes a role. The role is suspended and cannot be used to create new.
IAM Policy Bindings.
The Role will not be included in `ListRoles()` unless `show_deleted` is set
in the `ListRolesRequest`. The Role contains the deleted boolean set.
Existing Bindings remains, but are inactive. The Role can be undeleted
within 7 days. After 7 days the Role is deleted and all Bindings associated
with the role are removed.

      Args:
        request: (IamOrganizationsRolesDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/organizations/{organizationsId}/roles/{rolesId}',
        http_method=u'DELETE',
        method_id=u'iam.organizations.roles.delete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'etag'],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamOrganizationsRolesDeleteRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      """Gets a Role definition.

      Args:
        request: (IamOrganizationsRolesGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/organizations/{organizationsId}/roles/{rolesId}',
        http_method=u'GET',
        method_id=u'iam.organizations.roles.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamOrganizationsRolesGetRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists the Roles defined on a resource.

      Args:
        request: (IamOrganizationsRolesListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListRolesResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/organizations/{organizationsId}/roles',
        http_method=u'GET',
        method_id=u'iam.organizations.roles.list',
        ordered_params=[u'parent'],
        path_params=[u'parent'],
        query_params=[u'pageSize', u'pageToken', u'showDeleted', u'view'],
        relative_path=u'v1/{+parent}/roles',
        request_field='',
        request_type_name=u'IamOrganizationsRolesListRequest',
        response_type_name=u'ListRolesResponse',
        supports_download=False,
    )

    def Patch(self, request, global_params=None):
      """Updates a Role definition.

      Args:
        request: (IamOrganizationsRolesPatchRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Patch')
      return self._RunMethod(
          config, request, global_params=global_params)

    Patch.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/organizations/{organizationsId}/roles/{rolesId}',
        http_method=u'PATCH',
        method_id=u'iam.organizations.roles.patch',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'updateMask'],
        relative_path=u'v1/{+name}',
        request_field=u'role',
        request_type_name=u'IamOrganizationsRolesPatchRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def Undelete(self, request, global_params=None):
      """Undelete a Role, bringing it back in its previous state.

      Args:
        request: (IamOrganizationsRolesUndeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Undelete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Undelete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/organizations/{organizationsId}/roles/{rolesId}:undelete',
        http_method=u'POST',
        method_id=u'iam.organizations.roles.undelete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}:undelete',
        request_field=u'undeleteRoleRequest',
        request_type_name=u'IamOrganizationsRolesUndeleteRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

  class OrganizationsService(base_api.BaseApiService):
    """Service class for the organizations resource."""

    _NAME = u'organizations'

    def __init__(self, client):
      super(IamV1.OrganizationsService, self).__init__(client)
      self._upload_configs = {
          }

  class PermissionsService(base_api.BaseApiService):
    """Service class for the permissions resource."""

    _NAME = u'permissions'

    def __init__(self, client):
      super(IamV1.PermissionsService, self).__init__(client)
      self._upload_configs = {
          }

    def QueryTestablePermissions(self, request, global_params=None):
      """Lists the permissions testable on a resource.
A permission is testable if it can be tested for an identity on a resource.

      Args:
        request: (QueryTestablePermissionsRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (QueryTestablePermissionsResponse) The response message.
      """
      config = self.GetMethodConfig('QueryTestablePermissions')
      return self._RunMethod(
          config, request, global_params=global_params)

    QueryTestablePermissions.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'iam.permissions.queryTestablePermissions',
        ordered_params=[],
        path_params=[],
        query_params=[],
        relative_path=u'v1/permissions:queryTestablePermissions',
        request_field='<request>',
        request_type_name=u'QueryTestablePermissionsRequest',
        response_type_name=u'QueryTestablePermissionsResponse',
        supports_download=False,
    )

  class ProjectsRolesService(base_api.BaseApiService):
    """Service class for the projects_roles resource."""

    _NAME = u'projects_roles'

    def __init__(self, client):
      super(IamV1.ProjectsRolesService, self).__init__(client)
      self._upload_configs = {
          }

    def Create(self, request, global_params=None):
      """Creates a new Role.

      Args:
        request: (IamProjectsRolesCreateRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Create')
      return self._RunMethod(
          config, request, global_params=global_params)

    Create.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/roles',
        http_method=u'POST',
        method_id=u'iam.projects.roles.create',
        ordered_params=[u'parent'],
        path_params=[u'parent'],
        query_params=[],
        relative_path=u'v1/{+parent}/roles',
        request_field=u'createRoleRequest',
        request_type_name=u'IamProjectsRolesCreateRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      """Soft deletes a role. The role is suspended and cannot be used to create new.
IAM Policy Bindings.
The Role will not be included in `ListRoles()` unless `show_deleted` is set
in the `ListRolesRequest`. The Role contains the deleted boolean set.
Existing Bindings remains, but are inactive. The Role can be undeleted
within 7 days. After 7 days the Role is deleted and all Bindings associated
with the role are removed.

      Args:
        request: (IamProjectsRolesDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/roles/{rolesId}',
        http_method=u'DELETE',
        method_id=u'iam.projects.roles.delete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'etag'],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamProjectsRolesDeleteRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      """Gets a Role definition.

      Args:
        request: (IamProjectsRolesGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/roles/{rolesId}',
        http_method=u'GET',
        method_id=u'iam.projects.roles.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamProjectsRolesGetRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists the Roles defined on a resource.

      Args:
        request: (IamProjectsRolesListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListRolesResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/roles',
        http_method=u'GET',
        method_id=u'iam.projects.roles.list',
        ordered_params=[u'parent'],
        path_params=[u'parent'],
        query_params=[u'pageSize', u'pageToken', u'showDeleted', u'view'],
        relative_path=u'v1/{+parent}/roles',
        request_field='',
        request_type_name=u'IamProjectsRolesListRequest',
        response_type_name=u'ListRolesResponse',
        supports_download=False,
    )

    def Patch(self, request, global_params=None):
      """Updates a Role definition.

      Args:
        request: (IamProjectsRolesPatchRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Patch')
      return self._RunMethod(
          config, request, global_params=global_params)

    Patch.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/roles/{rolesId}',
        http_method=u'PATCH',
        method_id=u'iam.projects.roles.patch',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'updateMask'],
        relative_path=u'v1/{+name}',
        request_field=u'role',
        request_type_name=u'IamProjectsRolesPatchRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def Undelete(self, request, global_params=None):
      """Undelete a Role, bringing it back in its previous state.

      Args:
        request: (IamProjectsRolesUndeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Undelete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Undelete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/roles/{rolesId}:undelete',
        http_method=u'POST',
        method_id=u'iam.projects.roles.undelete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}:undelete',
        request_field=u'undeleteRoleRequest',
        request_type_name=u'IamProjectsRolesUndeleteRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

  class ProjectsServiceAccountsKeysService(base_api.BaseApiService):
    """Service class for the projects_serviceAccounts_keys resource."""

    _NAME = u'projects_serviceAccounts_keys'

    def __init__(self, client):
      super(IamV1.ProjectsServiceAccountsKeysService, self).__init__(client)
      self._upload_configs = {
          }

    def Create(self, request, global_params=None):
      """Creates a ServiceAccountKey.
and returns it.

      Args:
        request: (IamProjectsServiceAccountsKeysCreateRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ServiceAccountKey) The response message.
      """
      config = self.GetMethodConfig('Create')
      return self._RunMethod(
          config, request, global_params=global_params)

    Create.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys',
        http_method=u'POST',
        method_id=u'iam.projects.serviceAccounts.keys.create',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}/keys',
        request_field=u'createServiceAccountKeyRequest',
        request_type_name=u'IamProjectsServiceAccountsKeysCreateRequest',
        response_type_name=u'ServiceAccountKey',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      """Deletes a ServiceAccountKey.

      Args:
        request: (IamProjectsServiceAccountsKeysDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Empty) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys/{keysId}',
        http_method=u'DELETE',
        method_id=u'iam.projects.serviceAccounts.keys.delete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamProjectsServiceAccountsKeysDeleteRequest',
        response_type_name=u'Empty',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      """Gets the ServiceAccountKey.
by key id.

      Args:
        request: (IamProjectsServiceAccountsKeysGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ServiceAccountKey) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys/{keysId}',
        http_method=u'GET',
        method_id=u'iam.projects.serviceAccounts.keys.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'publicKeyType'],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamProjectsServiceAccountsKeysGetRequest',
        response_type_name=u'ServiceAccountKey',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists ServiceAccountKeys.

      Args:
        request: (IamProjectsServiceAccountsKeysListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListServiceAccountKeysResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}/keys',
        http_method=u'GET',
        method_id=u'iam.projects.serviceAccounts.keys.list',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'keyTypes'],
        relative_path=u'v1/{+name}/keys',
        request_field='',
        request_type_name=u'IamProjectsServiceAccountsKeysListRequest',
        response_type_name=u'ListServiceAccountKeysResponse',
        supports_download=False,
    )

  class ProjectsServiceAccountsService(base_api.BaseApiService):
    """Service class for the projects_serviceAccounts resource."""

    _NAME = u'projects_serviceAccounts'

    def __init__(self, client):
      super(IamV1.ProjectsServiceAccountsService, self).__init__(client)
      self._upload_configs = {
          }

    def Create(self, request, global_params=None):
      """Creates a ServiceAccount.
and returns it.

      Args:
        request: (IamProjectsServiceAccountsCreateRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ServiceAccount) The response message.
      """
      config = self.GetMethodConfig('Create')
      return self._RunMethod(
          config, request, global_params=global_params)

    Create.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts',
        http_method=u'POST',
        method_id=u'iam.projects.serviceAccounts.create',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}/serviceAccounts',
        request_field=u'createServiceAccountRequest',
        request_type_name=u'IamProjectsServiceAccountsCreateRequest',
        response_type_name=u'ServiceAccount',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      """Deletes a ServiceAccount.

      Args:
        request: (IamProjectsServiceAccountsDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Empty) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}',
        http_method=u'DELETE',
        method_id=u'iam.projects.serviceAccounts.delete',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamProjectsServiceAccountsDeleteRequest',
        response_type_name=u'Empty',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      """Gets a ServiceAccount.

      Args:
        request: (IamProjectsServiceAccountsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ServiceAccount) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}',
        http_method=u'GET',
        method_id=u'iam.projects.serviceAccounts.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamProjectsServiceAccountsGetRequest',
        response_type_name=u'ServiceAccount',
        supports_download=False,
    )

    def GetIamPolicy(self, request, global_params=None):
      """Returns the IAM access control policy for a.
ServiceAccount.

      Args:
        request: (IamProjectsServiceAccountsGetIamPolicyRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Policy) The response message.
      """
      config = self.GetMethodConfig('GetIamPolicy')
      return self._RunMethod(
          config, request, global_params=global_params)

    GetIamPolicy.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:getIamPolicy',
        http_method=u'POST',
        method_id=u'iam.projects.serviceAccounts.getIamPolicy',
        ordered_params=[u'resource'],
        path_params=[u'resource'],
        query_params=[],
        relative_path=u'v1/{+resource}:getIamPolicy',
        request_field='',
        request_type_name=u'IamProjectsServiceAccountsGetIamPolicyRequest',
        response_type_name=u'Policy',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists ServiceAccounts for a project.

      Args:
        request: (IamProjectsServiceAccountsListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListServiceAccountsResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts',
        http_method=u'GET',
        method_id=u'iam.projects.serviceAccounts.list',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[u'pageSize', u'pageToken'],
        relative_path=u'v1/{+name}/serviceAccounts',
        request_field='',
        request_type_name=u'IamProjectsServiceAccountsListRequest',
        response_type_name=u'ListServiceAccountsResponse',
        supports_download=False,
    )

    def SetIamPolicy(self, request, global_params=None):
      """Sets the IAM access control policy for a.
ServiceAccount.

      Args:
        request: (IamProjectsServiceAccountsSetIamPolicyRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Policy) The response message.
      """
      config = self.GetMethodConfig('SetIamPolicy')
      return self._RunMethod(
          config, request, global_params=global_params)

    SetIamPolicy.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:setIamPolicy',
        http_method=u'POST',
        method_id=u'iam.projects.serviceAccounts.setIamPolicy',
        ordered_params=[u'resource'],
        path_params=[u'resource'],
        query_params=[],
        relative_path=u'v1/{+resource}:setIamPolicy',
        request_field=u'setIamPolicyRequest',
        request_type_name=u'IamProjectsServiceAccountsSetIamPolicyRequest',
        response_type_name=u'Policy',
        supports_download=False,
    )

    def SignBlob(self, request, global_params=None):
      """Signs a blob using a service account's system-managed private key.

      Args:
        request: (IamProjectsServiceAccountsSignBlobRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (SignBlobResponse) The response message.
      """
      config = self.GetMethodConfig('SignBlob')
      return self._RunMethod(
          config, request, global_params=global_params)

    SignBlob.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:signBlob',
        http_method=u'POST',
        method_id=u'iam.projects.serviceAccounts.signBlob',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}:signBlob',
        request_field=u'signBlobRequest',
        request_type_name=u'IamProjectsServiceAccountsSignBlobRequest',
        response_type_name=u'SignBlobResponse',
        supports_download=False,
    )

    def SignJwt(self, request, global_params=None):
      """Signs a JWT using a service account's system-managed private key.

If no expiry time (`exp`) is provided in the `SignJwtRequest`, IAM sets an
an expiry time of one hour by default. If you request an expiry time of
more than one hour, the request will fail.

      Args:
        request: (IamProjectsServiceAccountsSignJwtRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (SignJwtResponse) The response message.
      """
      config = self.GetMethodConfig('SignJwt')
      return self._RunMethod(
          config, request, global_params=global_params)

    SignJwt.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:signJwt',
        http_method=u'POST',
        method_id=u'iam.projects.serviceAccounts.signJwt',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}:signJwt',
        request_field=u'signJwtRequest',
        request_type_name=u'IamProjectsServiceAccountsSignJwtRequest',
        response_type_name=u'SignJwtResponse',
        supports_download=False,
    )

    def TestIamPermissions(self, request, global_params=None):
      """Tests the specified permissions against the IAM access control policy.
for a ServiceAccount.

      Args:
        request: (IamProjectsServiceAccountsTestIamPermissionsRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (TestIamPermissionsResponse) The response message.
      """
      config = self.GetMethodConfig('TestIamPermissions')
      return self._RunMethod(
          config, request, global_params=global_params)

    TestIamPermissions.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}:testIamPermissions',
        http_method=u'POST',
        method_id=u'iam.projects.serviceAccounts.testIamPermissions',
        ordered_params=[u'resource'],
        path_params=[u'resource'],
        query_params=[],
        relative_path=u'v1/{+resource}:testIamPermissions',
        request_field=u'testIamPermissionsRequest',
        request_type_name=u'IamProjectsServiceAccountsTestIamPermissionsRequest',
        response_type_name=u'TestIamPermissionsResponse',
        supports_download=False,
    )

    def Update(self, request, global_params=None):
      """Updates a ServiceAccount.

Currently, only the following fields are updatable:
`display_name` .
The `etag` is mandatory.

      Args:
        request: (ServiceAccount) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ServiceAccount) The response message.
      """
      config = self.GetMethodConfig('Update')
      return self._RunMethod(
          config, request, global_params=global_params)

    Update.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/projects/{projectsId}/serviceAccounts/{serviceAccountsId}',
        http_method=u'PUT',
        method_id=u'iam.projects.serviceAccounts.update',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}',
        request_field='<request>',
        request_type_name=u'ServiceAccount',
        response_type_name=u'ServiceAccount',
        supports_download=False,
    )

  class ProjectsService(base_api.BaseApiService):
    """Service class for the projects resource."""

    _NAME = u'projects'

    def __init__(self, client):
      super(IamV1.ProjectsService, self).__init__(client)
      self._upload_configs = {
          }

  class RolesService(base_api.BaseApiService):
    """Service class for the roles resource."""

    _NAME = u'roles'

    def __init__(self, client):
      super(IamV1.RolesService, self).__init__(client)
      self._upload_configs = {
          }

    def Get(self, request, global_params=None):
      """Gets a Role definition.

      Args:
        request: (IamRolesGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Role) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1/roles/{rolesId}',
        http_method=u'GET',
        method_id=u'iam.roles.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1/{+name}',
        request_field='',
        request_type_name=u'IamRolesGetRequest',
        response_type_name=u'Role',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists the Roles defined on a resource.

      Args:
        request: (IamRolesListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ListRolesResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'iam.roles.list',
        ordered_params=[],
        path_params=[],
        query_params=[u'pageSize', u'pageToken', u'parent', u'showDeleted', u'view'],
        relative_path=u'v1/roles',
        request_field='',
        request_type_name=u'IamRolesListRequest',
        response_type_name=u'ListRolesResponse',
        supports_download=False,
    )

    def QueryGrantableRoles(self, request, global_params=None):
      """Queries roles that can be granted on a particular resource.
A role is grantable if it can be used as the role in a binding for a policy
for that resource.

      Args:
        request: (QueryGrantableRolesRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (QueryGrantableRolesResponse) The response message.
      """
      config = self.GetMethodConfig('QueryGrantableRoles')
      return self._RunMethod(
          config, request, global_params=global_params)

    QueryGrantableRoles.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'iam.roles.queryGrantableRoles',
        ordered_params=[],
        path_params=[],
        query_params=[],
        relative_path=u'v1/roles:queryGrantableRoles',
        request_field='<request>',
        request_type_name=u'QueryGrantableRolesRequest',
        response_type_name=u'QueryGrantableRolesResponse',
        supports_download=False,
    )
