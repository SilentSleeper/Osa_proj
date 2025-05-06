from django.urls import path
from .views import TableDataView

urlpatterns = [
    path('data/<str:table_name>/', TableDataView.as_view()),
]
