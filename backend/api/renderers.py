import json
from rest_framework.renderers import JSONRenderer
from rest_framework.utils.serializer_helpers import ReturnList

class RecordJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):
        errors = data.get('errors', None)

        if errors is not None:
            return super(RecordJSONRenderer, self).render(data)

        return json.dumps(data)

class GameModeJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):
        if type(data) is not ReturnList:
            detail = data.get('detail', None)
        
            if detail is not None:
                return super(GameModeJSONRenderer, self).render(data)

            return json.dumps({
                'gamemode': data
            })
        else:
            return json.dumps({
                'gamemodes': data
            })


class TextJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):
        if type(data) is not ReturnList:
            detail = data.get('detail', None)
        
            if detail is not None:
                return super(TextJSONRenderer, self).render(data)

            return json.dumps({
                'text': data
            })
        else:
            return json.dumps({
                'texts': data
            })
        
