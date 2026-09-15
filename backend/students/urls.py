from django.urls import path
from .views import student_list, student_detail

urlpatterns = [
    path('', student_list),
    path('<int:student_id>/', student_detail),
]
