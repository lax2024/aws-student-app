from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Student
import json


@csrf_exempt
def student_list(request):

    if request.method == 'GET':
        students = Student.objects.all()

        data = [
            {
                "id": student.id,
                "name": student.name,
                "email": student.email,
                "course": student.course,
                "age": student.age,
            }
            for student in students
        ]

        return JsonResponse(data, safe=False)

    if request.method == 'POST':
        data = json.loads(request.body)

        student = Student.objects.create(
            name=data['name'],
            email=data['email'],
            course=data.get('course'),
            age=data.get('age')
        )

        return JsonResponse({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "course": student.course,
            "age": student.age,
        }, status=201)


@csrf_exempt
def student_detail(request, student_id):

    try:
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)

    if request.method == 'PUT':
        data = json.loads(request.body)

        student.name = data['name']
        student.email = data['email']
        student.course = data.get('course')
        student.age = data.get('age')
        student.save()

        return JsonResponse({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "course": student.course,
            "age": student.age,
        })

    if request.method == 'DELETE':
        student.delete()
        return JsonResponse({"message": "Student deleted"})
