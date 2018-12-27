from django.shortcuts import render
from django.views.generic.list import ListView
from django.http import JsonResponse

from .models import Scan

class IndexView(ListView):
	#template = 'scans/index.html'
	model = Scan

	def get_ordering(self):
		return '-date'

def rename(request):
	pk = request.GET['pk']
	new_name = request.GET['name']

	obj = Scan.objects.get(pk=pk)
	if len(new_name) < 35 and len(new_name) > 0:
		obj.name = new_name
		error = 0
		obj.save()
		name_return = Scan.objects.get(pk=pk).name
	else:
		error = 1
		name_return = ''

	data = {
		'name_return': name_return,
		'error': error
	}

	return JsonResponse(data)