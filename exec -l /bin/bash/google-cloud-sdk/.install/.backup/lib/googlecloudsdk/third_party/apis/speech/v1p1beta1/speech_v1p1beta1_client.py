"""Generated client library for speech version v1p1beta1."""
# NOTE: This file is autogenerated and should not be edited by hand.
from apitools.base.py import base_api
from googlecloudsdk.third_party.apis.speech.v1p1beta1 import speech_v1p1beta1_messages as messages


class SpeechV1p1beta1(base_api.BaseApiClient):
  """Generated client library for service speech version v1p1beta1."""

  MESSAGES_MODULE = messages
  BASE_URL = u'https://speech.googleapis.com/'

  _PACKAGE = u'speech'
  _SCOPES = [u'https://www.googleapis.com/auth/cloud-platform']
  _VERSION = u'v1p1beta1'
  _CLIENT_ID = '1042881264118.apps.googleusercontent.com'
  _CLIENT_SECRET = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _USER_AGENT = 'x_Tw5K8nnjoRAqULM9PFAC2b'
  _CLIENT_CLASS_NAME = u'SpeechV1p1beta1'
  _URL_VERSION = u'v1p1beta1'
  _API_KEY = None

  def __init__(self, url='', credentials=None,
               get_credentials=True, http=None, model=None,
               log_request=False, log_response=False,
               credentials_args=None, default_global_params=None,
               additional_http_headers=None, response_encoding=None):
    """Create a new speech handle."""
    url = url or self.BASE_URL
    super(SpeechV1p1beta1, self).__init__(
        url, credentials=credentials,
        get_credentials=get_credentials, http=http, model=model,
        log_request=log_request, log_response=log_response,
        credentials_args=credentials_args,
        default_global_params=default_global_params,
        additional_http_headers=additional_http_headers,
        response_encoding=response_encoding)
    self.operations = self.OperationsService(self)
    self.speech = self.SpeechService(self)

  class OperationsService(base_api.BaseApiService):
    """Service class for the operations resource."""

    _NAME = u'operations'

    def __init__(self, client):
      super(SpeechV1p1beta1.OperationsService, self).__init__(client)
      self._upload_configs = {
          }

    def Get(self, request, global_params=None):
      """Gets the latest state of a long-running operation.  Clients can use this.
method to poll the operation result at intervals as recommended by the API
service.

      Args:
        request: (SpeechOperationsGetRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Get')
      return self._RunMethod(
          config, request, global_params=global_params)

    Get.method_config = lambda: base_api.ApiMethodInfo(
        flat_path=u'v1p1beta1/operations/{operationsId}',
        http_method=u'GET',
        method_id=u'speech.operations.get',
        ordered_params=[u'name'],
        path_params=[u'name'],
        query_params=[],
        relative_path=u'v1p1beta1/operations/{+name}',
        request_field='',
        request_type_name=u'SpeechOperationsGetRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

  class SpeechService(base_api.BaseApiService):
    """Service class for the speech resource."""

    _NAME = u'speech'

    def __init__(self, client):
      super(SpeechV1p1beta1.SpeechService, self).__init__(client)
      self._upload_configs = {
          }

    def Longrunningrecognize(self, request, global_params=None):
      """Performs asynchronous speech recognition: receive results via the.
google.longrunning.Operations interface. Returns either an
`Operation.error` or an `Operation.response` which contains
a `LongRunningRecognizeResponse` message.

      Args:
        request: (LongRunningRecognizeRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (Operation) The response message.
      """
      config = self.GetMethodConfig('Longrunningrecognize')
      return self._RunMethod(
          config, request, global_params=global_params)

    Longrunningrecognize.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'speech.speech.longrunningrecognize',
        ordered_params=[],
        path_params=[],
        query_params=[],
        relative_path=u'v1p1beta1/speech:longrunningrecognize',
        request_field='<request>',
        request_type_name=u'LongRunningRecognizeRequest',
        response_type_name=u'Operation',
        supports_download=False,
    )

    def Recognize(self, request, global_params=None):
      """Performs synchronous speech recognition: receive results after all audio.
has been sent and processed.

      Args:
        request: (RecognizeRequest) input message
        global_params: (StandardQueryParameters, default: None) global arguments
      Returns:
        (RecognizeResponse) The response message.
      """
      config = self.GetMethodConfig('Recognize')
      return self._RunMethod(
          config, request, global_params=global_params)

    Recognize.method_config = lambda: base_api.ApiMethodInfo(
        http_method=u'POST',
        method_id=u'speech.speech.recognize',
        ordered_params=[],
        path_params=[],
        query_params=[],
        relative_path=u'v1p1beta1/speech:recognize',
        request_field='<request>',
        request_type_name=u'RecognizeRequest',
        response_type_name=u'RecognizeResponse',
        supports_download=False,
    )
