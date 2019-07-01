from django.views.generic import View
from django.http import HttpResponse
from django.http import JsonResponse
from django.conf import settings
import os 


def save(request):
    return JsonResponse({
        'results': ['yo']
    })


class ReactAppView(View):

    def get(self, request):
        try:
            print(os.path.join(settings.REACT_APP, 'build'))
            with open(os.path.join(settings.REACT_APP,
                                   'build', 'index.html')) as file:
                return HttpResponse(file.read())
        except :
            return HttpResponse(
                """
                index.html not found ! build your React app !!
                """, status=501)
