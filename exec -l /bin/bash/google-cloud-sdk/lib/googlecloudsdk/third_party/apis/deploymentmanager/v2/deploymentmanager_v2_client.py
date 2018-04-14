"""Generated client library for deploymentmanager version v2."""
# NOTE: This file is autogenerated and should not be edited by hand.
from apitools.base.py import base_api
from googlecloudsdk.third_party.apis.deploymentmanager.v2 import deploymentmanager_v2_messages as messages


class DeploymentmanagerV2(base_api.BaseApiClient):
  """Generated client library for service deploymentmanager version v2."""

  MESSAGES_MODULE = messages
  BASE_URL = u'https://www.googleapis.com/deploymentmanager/v2/'

  _PACKAGE = u'deploymentmanager'
  _SCOPES = [u'https://www.googleapis.com/auth/cloud-platform', u'https://www.googleapis.com/auth/cloud-platform.read-only', u'https://www.googleapis.com/auth/ndev.cloudman', u'https://www.googleapis.com/auth/ndev.cloudman.readonly']
  _VERSION = u'v2'
  _CLIENT_ID = '1042881264118.apps.googleusercontent.com'
  _CLIENT_SECRET = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _USER_AGENT = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _CLIENT_CLASS_NAME = u'DeploymentmanagerV2'
  _URL_VERSION = u'v2'
  _API_KEY = None

  def __init__(self, url='', credentials=None,
               get_credentials=True, http=None, model=None,
               log_request=False, log_response=False,
               credentials_args=None, default_global_params=None,
               additional_http_headers=None, response_encoding=None):
    """Create a new deploymentmanager handle."""
    url = url or self.BASE_URL
    super(DeploymentmanagerV2, self).__init__(
        url, credentials=credentials,
        get_credentials=get_credentials, http=http, model=model,
        log_request=log_request, log_response=log_response,
        credentials_args=credentials_args,
        default_global_params=default_global_params,
        additional_http_headers=additional_http_headers,
        response_encoding=response_encoding)
    self.deployments = self.DeploymentsService(self)
    self.manifests = self.ManifestsService(self)
    self.operations = self.OperationsService(self)
    self.resources = self.ResourcesService(self)
    self.types = self.TypesService(self)

  class DeploymentsService(base_api.BaseApiService):
    """Service class for the deployments resource."""

    _NAME = u'deployments'

    def __init__(self, client):
      super(DeploymentmanagerV2.DeploymentsService, self).__init__(client)
      self._upload_configs = {
          }

    def CancelPreview(self, request, global_params=None):
      """Cancels and removes the preview currently associated with the deployment.

      Args:
        request: (DeploymentmanagerDeploymentsCancelPreviewRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('CancelPreview')
      return self._RunMethod(
          config, request, global_params=global_params)

    CancelPreview.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'deploymentmanager.deployments.cancelPreview',
        ordered_params=[u'project', u'deployment'],
        path_params=[u'deployment', u'project'],
        query_params=[],
        relative_path=u'projects/{project}/global/deployments/{deployment}/cancelPreview',
        request_field=u'deploymentsCancelPreviewRequest',
        request_type_name=u'DeploymentmanagerDeploymentsCancelPreviewRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Delete(self, request, global_params=None):
      """Deletes a deployment and all of the resources in the deployment.

      Args:
        request: (DeploymentmanagerDeploymentsDeleteRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Delete')
      return self._RunMethod(
          config, request, global_params=global_params)

    Delete.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'DELETE',
        method_id=u'deploymentmanager.deployments.delete',
        ordered_params=[u'project', u'deployment'],
        path_params=[u'deployment', u'project'],
        query_params=[u'deletePolicy'],
        relative_path=u'projects/{project}/global/deployments/{deployment}',
        request_field='',
        request_type_name=u'DeploymentmanagerDeploymentsDeleteRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Get(self, request, global_params=None):
      """Gets information about a specific deployment.

      Args:
        request: (DeploymentmanagerDeploymentsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Deployment) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.deployments.get',
        ordered_params=[u'project', u'deployment'],
        path_params=[u'deployment', u'project'],
        query_params=[],
        relative_path=u'projects/{project}/global/deployments/{deployment}',
        request_field='',
        request_type_name=u'DeploymentmanagerDeploymentsGetRequest',
        response_type_name=u'Deployment',
        supports_download=False,
    )

    def GetIamPolicy(self, request, global_params=None):
      """Gets the access control policy for a resource. May be empty if no such policy or resource exists.

      Args:
        request: (DeploymentmanagerDeploymentsGetIamPolicyRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Policy) The response message.
      """
      config = self.GetMethodConfig('GetIamPolicy')
      return self._RunMethod(
          config, request, global_params=global_params)

    GetIamPolicy.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.deployments.getIamPolicy',
        ordered_params=[u'project', u'resource'],
        path_params=[u'project', u'resource'],
        query_params=[],
        relative_path=u'projects/{project}/global/deployments/{resource}/getIamPolicy',
        request_field='',
        request_type_name=u'DeploymentmanagerDeploymentsGetIamPolicyRequest',
        response_type_name=u'Policy',
        supports_download=False,
    )

    def Insert(self, request, global_params=None):
      """Creates a deployment and all of the resources described by the deployment manifest.

      Args:
        request: (DeploymentmanagerDeploymentsInsertRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Insert')
      return self._RunMethod(
          config, request, global_params=global_params)

    Insert.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'deploymentmanager.deployments.insert',
        ordered_params=[u'project'],
        path_params=[u'project'],
        query_params=[u'createPolicy', u'preview'],
        relative_path=u'projects/{project}/global/deployments',
        request_field=u'deployment',
        request_type_name=u'DeploymentmanagerDeploymentsInsertRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists all deployments for a given project.

      Args:
        request: (DeploymentmanagerDeploymentsListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (DeploymentsListResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.deployments.list',
        ordered_params=[u'project'],
        path_params=[u'project'],
        query_params=[u'filter', u'maxResults', u'orderBy', u'pageToken'],
        relative_path=u'projects/{project}/global/deployments',
        request_field='',
        request_type_name=u'DeploymentmanagerDeploymentsListRequest',
        response_type_name=u'DeploymentsListResponse',
        supports_download=False,
    )

    def Patch(self, request, global_params=None):
      """Updates a deployment and all of the resources described by the deployment manifest. This method supports patch semantics.

      Args:
        request: (DeploymentmanagerDeploymentsPatchRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Patch')
      return self._RunMethod(
          config, request, global_params=global_params)

    Patch.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'PATCH',
        method_id=u'deploymentmanager.deployments.patch',
        ordered_params=[u'project', u'deployment'],
        path_params=[u'deployment', u'project'],
        query_params=[u'createPolicy', u'deletePolicy', u'preview'],
        relative_path=u'projects/{project}/global/deployments/{deployment}',
        request_field=u'deploymentResource',
        request_type_name=u'DeploymentmanagerDeploymentsPatchRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def SetIamPolicy(self, request, global_params=None):
      """Sets the access control policy on the specified resource. Replaces any existing policy.

      Args:
        request: (DeploymentmanagerDeploymentsSetIamPolicyRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Policy) The response message.
      """
      config = self.GetMethodConfig('SetIamPolicy')
      return self._RunMethod(
          config, request, global_params=global_params)

    SetIamPolicy.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'deploymentmanager.deployments.setIamPolicy',
        ordered_params=[u'project', u'resource'],
        path_params=[u'project', u'resource'],
        query_params=[],
        relative_path=u'projects/{project}/global/deployments/{resource}/setIamPolicy',
        request_field=u'policy',
        request_type_name=u'DeploymentmanagerDeploymentsSetIamPolicyRequest',
        response_type_name=u'Policy',
        supports_download=False,
    )

    def Stop(self, request, global_params=None):
      """Stops an ongoing operation. This does not roll back any work that has already been completed, but prevents any new work from being started.

      Args:
        request: (DeploymentmanagerDeploymentsStopRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Stop')
      return self._RunMethod(
          config, request, global_params=global_params)

    Stop.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'deploymentmanager.deployments.stop',
        ordered_params=[u'project', u'deployment'],
        path_params=[u'deployment', u'project'],
        query_params=[],
        relative_path=u'projects/{project}/global/deployments/{deployment}/stop',
        request_field=u'deploymentsStopRequest',
        request_type_name=u'DeploymentmanagerDeploymentsStopRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def TestIamPermissions(self, request, global_params=None):
      """Returns permissions that a caller has on the specified resource.

      Args:
        request: (DeploymentmanagerDeploymentsTestIamPermissionsRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (TestPermissionsResponse) The response message.
      """
      config = self.GetMethodConfig('TestIamPermissions')
      return self._RunMethod(
          config, request, global_params=global_params)

    TestIamPermissions.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'deploymentmanager.deployments.testIamPermissions',
        ordered_params=[u'project', u'resource'],
        path_params=[u'project', u'resource'],
        query_params=[],
        relative_path=u'projects/{project}/global/deployments/{resource}/testIamPermissions',
        request_field=u'testPermissionsRequest',
        request_type_name=u'DeploymentmanagerDeploymentsTestIamPermissionsRequest',
        response_type_name=u'TestPermissionsResponse',
        supports_download=False,
    )

    def Update(self, request, global_params=None):
      """Updates a deployment and all of the resources described by the deployment manifest.

      Args:
        request: (DeploymentmanagerDeploymentsUpdateRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Update')
      return self._RunMethod(
          config, request, global_params=global_params)

    Update.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'PUT',
        method_id=u'deploymentmanager.deployments.update',
        ordered_params=[u'project', u'deployment'],
        path_params=[u'deployment', u'project'],
        query_params=[u'createPolicy', u'deletePolicy', u'preview'],
        relative_path=u'projects/{project}/global/deployments/{deployment}',
        request_field=u'deploymentResource',
        request_type_name=u'DeploymentmanagerDeploymentsUpdateRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

  class ManifestsService(base_api.BaseApiService):
    """Service class for the manifests resource."""

    _NAME = u'manifests'

    def __init__(self, client):
      super(DeploymentmanagerV2.ManifestsService, self).__init__(client)
      self._upload_configs = {
          }

    def Get(self, request, global_params=None):
      """Gets information about a specific manifest.

      Args:
        request: (DeploymentmanagerManifestsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Manifest) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.manifests.get',
        ordered_params=[u'project', u'deployment', u'manifest'],
        path_params=[u'deployment', u'manifest', u'project'],
        query_params=[],
        relative_path=u'projects/{project}/global/deployments/{deployment}/manifests/{manifest}',
        request_field='',
        request_type_name=u'DeploymentmanagerManifestsGetRequest',
        response_type_name=u'Manifest',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists all manifests for a given deployment.

      Args:
        request: (DeploymentmanagerManifestsListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ManifestsListResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.manifests.list',
        ordered_params=[u'project', u'deployment'],
        path_params=[u'deployment', u'project'],
        query_params=[u'filter', u'maxResults', u'orderBy', u'pageToken'],
        relative_path=u'projects/{project}/global/deployments/{deployment}/manifests',
        request_field='',
        request_type_name=u'DeploymentmanagerManifestsListRequest',
        response_type_name=u'ManifestsListResponse',
        supports_download=False,
    )

  class OperationsService(base_api.BaseApiService):
    """Service class for the operations resource."""

    _NAME = u'operations'

    def __init__(self, client):
      super(DeploymentmanagerV2.OperationsService, self).__init__(client)
      self._upload_configs = {
          }

    def Get(self, request, global_params=None):
      """Gets information about a specific operation.

      Args:
        request: (DeploymentmanagerOperationsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.operations.get',
        ordered_params=[u'project', u'operation'],
        path_params=[u'operation', u'project'],
        query_params=[],
        relative_path=u'projects/{project}/global/operations/{operation}',
        request_field='',
        request_type_name=u'DeploymentmanagerOperationsGetRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists all operations for a project.

      Args:
        request: (DeploymentmanagerOperationsListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (OperationsListResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.operations.list',
        ordered_params=[u'project'],
        path_params=[u'project'],
        query_params=[u'filter', u'maxResults', u'orderBy', u'pageToken'],
        relative_path=u'projects/{project}/global/operations',
        request_field='',
        request_type_name=u'DeploymentmanagerOperationsListRequest',
        response_type_name=u'OperationsListResponse',
        supports_download=False,
    )

  class ResourcesService(base_api.BaseApiService):
    """Service class for the resources resource."""

    _NAME = u'resources'

    def __init__(self, client):
      super(DeploymentmanagerV2.ResourcesService, self).__init__(client)
      self._upload_configs = {
          }

    def Get(self, request, global_params=None):
      """Gets information about a single resource.

      Args:
        request: (DeploymentmanagerResourcesGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Resource) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.resources.get',
        ordered_params=[u'project', u'deployment', u'resource'],
        path_params=[u'deployment', u'project', u'resource'],
        query_params=[],
        relative_path=u'projects/{project}/global/deployments/{deployment}/resources/{resource}',
        request_field='',
        request_type_name=u'DeploymentmanagerResourcesGetRequest',
        response_type_name=u'Resource',
        supports_download=False,
    )

    def List(self, request, global_params=None):
      """Lists all resources in a given deployment.

      Args:
        request: (DeploymentmanagerResourcesListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (ResourcesListResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.resources.list',
        ordered_params=[u'project', u'deployment'],
        path_params=[u'deployment', u'project'],
        query_params=[u'filter', u'maxResults', u'orderBy', u'pageToken'],
        relative_path=u'projects/{project}/global/deployments/{deployment}/resources',
        request_field='',
        request_type_name=u'DeploymentmanagerResourcesListRequest',
        response_type_name=u'ResourcesListResponse',
        supports_download=False,
    )

  class TypesService(base_api.BaseApiService):
    """Service class for the types resource."""

    _NAME = u'types'

    def __init__(self, client):
      super(DeploymentmanagerV2.TypesService, self).__init__(client)
      self._upload_configs = {
          }

    def List(self, request, global_params=None):
      """Lists all resource types for Deployment Manager.

      Args:
        request: (DeploymentmanagerTypesListRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (TypesListResponse) The response message.
      """
      config = self.GetMethodConfig('List')
      return self._RunMethod(
          config, request, global_params=global_params)

    List.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'GET',
        method_id=u'deploymentmanager.types.list',
        ordered_params=[u'project'],
        path_params=[u'project'],
        query_params=[u'filter', u'maxResults', u'orderBy', u'pageToken'],
        relative_path=u'projects/{project}/global/types',
        request_field='',
        request_type_name=u'DeploymentmanagerTypesListRequest',
        response_type_name=u'TypesListResponse',
        supports_download=False,
    )
