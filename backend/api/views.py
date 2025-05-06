from django.http import JsonResponse
from django.views import View
from django.db import connection

VALID_TABLES = [
    "Institutes", "Country", "Research_Team", "Project", "Investor",
    "Investment", "Institute", "License", "Model", "Implementation_Team",
    "Data_Collection_Team", "Patient", "Visit", "Hospital", "Data_set",
    "Application", "Graphic_Interface", "Parameter", "Performance",
    "Rating_Type", "Genomics",
]

class TableDataView(View):
    def get(self, request, table_name):
        if table_name not in VALID_TABLES:
            return JsonResponse({'error': 'Invalid table name'}, status=400)
        
        with connection.cursor() as cursor:
            cursor.execute(f"SELECT * FROM `{table_name}`")
            columns = [col[0] for col in cursor.description]
            rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        
        return JsonResponse(rows, safe=False)

