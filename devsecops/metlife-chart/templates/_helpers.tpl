{{/*
Expand the name of the chart.
*/}}
{{- define "metlife-chart.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "metlife-chart.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "metlife-chart.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "metlife-chart.labels" -}}
helm.sh/chart: {{ include "metlife-chart.chart" . }}
{{ include "metlife-chart.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "metlife-chart.selectorLabels" -}}
app.kubernetes.io/name: {{ include "metlife-chart.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "metlife-chart.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "metlife-chart.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- define "helpers.secret-kv-env-variables"}}
{{- $keyVaultSecret := .Values.keyVault.secret }}
{{- if .Values.keyVault.enabled }}
{{- range $key, $val := .Values.keyVault.env }}
  - name: {{ $key }}
    valueFrom:
      secretKeyRef:
        name: {{ $keyVaultSecret }}
        key: {{ $key }}
{{- end }}
{{- end }}
{{- end }}

{{- define "helpers.secret-kv-objects"}}
{{- if .Values.keyVault.enabled }}
{{- range $key, $val := .Values.keyVault.env }}
  - |
    objectName: {{ $val }}
    objectType: secret
    objectAlias: {{ $key }}
{{- end }}
{{- end }}
{{- end }}

{{- define "helpers.secret-kv-data"}}
{{- if .Values.keyVault.enabled }}
{{- range $key, $val := .Values.keyVault.env }}
  - key: {{ $key }}
    objectName: {{ $key }}  
{{- end }}
{{- end }}
{{- end }}

{{- define "helpers.envs-variables"}}
{{- range $key, $val := .Values.envs }}
  - name: {{ $key }}
    value: {{ default "" $val | quote }}
{{- end }}
{{- end }}
