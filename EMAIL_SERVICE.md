# 📧 Service d'Envoi d'Emails - SuribassMusic

## Vue d'ensemble

Le service d'envoi d'emails permet d'envoyer des notifications par email via SMTP. Il est configuré pour fonctionner avec IONOS ou tout autre fournisseur SMTP.

## 🔧 Configuration

### Variables d'environnement

Ajoutez ces variables dans votre fichier `.env` :

```env
# Configuration Email (SMTP)
EMAIL_ENABLED=true
EMAIL_SMTP_HOST=smtp.ionos.fr
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=your-email@yourdomaine.com
EMAIL_SMTP_PASSWORD=your-email-password
EMAIL_FROM_EMAIL=noreply@yourdomaine.com
EMAIL_FROM_NAME=SuribassMusic
EMAIL_ENABLE_SSL=true
```

### Configuration IONOS

Pour configurer avec IONOS :

1. **Serveur SMTP** : `smtp.ionos.fr`
2. **Port** : `587` (STARTTLS) ou `465` (SSL/TLS)
3. **Authentification** : Votre email complet et mot de passe
4. **SSL/TLS** : Activé

### Configuration dans Docker Compose

Les variables sont déjà configurées dans `docker-compose.yml` :

```yaml
environment:
  - Email__Enabled=${EMAIL_ENABLED:-true}
  - Email__SmtpHost=${EMAIL_SMTP_HOST}
  - Email__SmtpPort=${EMAIL_SMTP_PORT:-587}
  - Email__SmtpUsername=${EMAIL_SMTP_USERNAME}
  - Email__SmtpPassword=${EMAIL_SMTP_PASSWORD}
  - Email__FromEmail=${EMAIL_FROM_EMAIL}
  - Email__FromName=${EMAIL_FROM_NAME:-SuribassMusic}
  - Email__EnableSsl=${EMAIL_ENABLE_SSL:-true}
```

## 📡 API Endpoints

### 1. Obtenir la configuration actuelle

```http
GET /api/v1/email/config
Authorization: Bearer {admin_token}
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "smtpHost": "smtp.ionos.fr",
    "smtpPort": 587,
    "smtpUsername": "noreply@suribassmusic.com",
    "fromEmail": "noreply@suribassmusic.com",
    "fromName": "SuribassMusic",
    "enableSsl": true
  }
}
```

### 2. Tester la connexion SMTP

```http
POST /api/v1/email/test-connection
Authorization: Bearer {admin_token}
```

**Réponse réussie** :
```json
{
  "success": true,
  "data": {
    "isSuccess": true,
    "message": "Connexion SMTP réussie. Le service d'email est correctement configuré.",
    "testedAt": "2024-12-01T20:30:00Z"
  },
  "message": "Connexion SMTP réussie"
}
```

**Réponse en échec** :
```json
{
  "success": false,
  "data": {
    "isSuccess": false,
    "message": "Échec de la connexion SMTP. Veuillez vérifier votre configuration.",
    "testedAt": "2024-12-01T20:30:00Z"
  },
  "errors": ["Échec de la connexion SMTP. Veuillez vérifier votre configuration."]
}
```

### 3. Envoyer un email de test

```http
POST /api/v1/email/test-send
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "toEmail": "test@example.com",
  "subject": "Test SuribassMusic",
  "message": "Ceci est un test personnalisé"
}
```

**Paramètres** :
- `toEmail` (requis) : Adresse email du destinataire
- `subject` (optionnel) : Sujet de l'email (par défaut : "Email de test - SuribassMusic")
- `message` (optionnel) : Message personnalisé (par défaut : template HTML)

**Réponse réussie** :
```json
{
  "success": true,
  "message": "Email de test envoyé avec succès à test@example.com"
}
```

### 4. Mettre à jour la configuration (Instructions)

```http
PUT /api/v1/email/config
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "smtpHost": "smtp.ionos.fr",
  "smtpPort": 587,
  "smtpUsername": "noreply@suribassmusic.com",
  "smtpPassword": "your-password",
  "fromEmail": "noreply@suribassmusic.com",
  "fromName": "SuribassMusic",
  "enableSsl": true,
  "enabled": true
}
```

**Note** : Cette route retourne les instructions pour mettre à jour la configuration via les variables d'environnement. Pour des raisons de sécurité, la configuration ne peut pas être modifiée directement via l'API.

## 🎨 Template Email par défaut

Lors de l'envoi d'un email de test sans message personnalisé, un template HTML élégant est utilisé :

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .success-badge {
            background: #10b981;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎵 SuribassMusic</h1>
            <p>Configuration Email</p>
        </div>
        <div class='content'>
            <div class='success-badge'>✓ Configuration réussie</div>
            <h2>Félicitations !</h2>
            <p>Votre service d'envoi d'emails est correctement configuré...</p>
        </div>
    </div>
</body>
</html>
```

## 🔒 Sécurité

- ✅ Toutes les routes sont protégées par le policy `AdminOnly`
- ✅ Les mots de passe ne sont jamais retournés dans les réponses API
- ✅ La configuration est gérée via variables d'environnement
- ✅ Support SSL/TLS obligatoire en production

## 🚀 Déploiement

### 1. Configuration locale (développement)

```bash
# 1. Copiez le fichier .env.example
cp .env.example .env

# 2. Modifiez les variables EMAIL_* dans .env
nano .env

# 3. Redémarrez l'application
dotnet run --project src/SuribassMusic.API
```

### 2. Configuration Docker (production)

```bash
# 1. Mettez à jour votre fichier .env avec vos identifiants IONOS
nano .env

# 2. Redémarrez les conteneurs
docker-compose restart api
```

### 3. Vérification

```bash
# Testez la connexion via l'API
curl -X POST https://api.suribassmusic.com/api/v1/email/test-connection \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Envoyez un email de test
curl -X POST https://api.suribassmusic.com/api/v1/email/test-send \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"toEmail": "votre-email@example.com"}'
```

## 🧪 Tests

### Test manuel via Swagger

1. Accédez à `https://api.suribassmusic.com/swagger`
2. Authentifiez-vous en tant qu'admin
3. Testez les endpoints `/api/v1/email/*`

### Test via cURL

```bash
# Obtenir un token admin
TOKEN=$(curl -X POST https://api.suribassmusic.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@suribassmusic.com","password":"admin_password"}' \
  | jq -r '.data.accessToken')

# Tester la connexion
curl -X POST https://api.suribassmusic.com/api/v1/email/test-connection \
  -H "Authorization: Bearer $TOKEN"
```

## 📊 Logs

Les logs du service email sont disponibles :

```bash
# Via Docker
docker-compose logs -f api | grep "Email"

# Exemples de logs
[INF] Testing SMTP connection to smtp.ionos.fr:587
[INF] SMTP connection test successful
[INF] Envoi d'email de test à test@example.com
[INF] Email de test envoyé avec succès à test@example.com
[ERR] SMTP connection test failed: Authentication failed
```

## ❓ Troubleshooting

### Problème : "Authentication failed"

**Solution** :
- Vérifiez que `EMAIL_SMTP_USERNAME` et `EMAIL_SMTP_PASSWORD` sont corrects
- Pour IONOS, utilisez votre email complet comme nom d'utilisateur

### Problème : "Connection timeout"

**Solution** :
- Vérifiez que `EMAIL_SMTP_HOST` et `EMAIL_SMTP_PORT` sont corrects
- IONOS : port 587 (STARTTLS) ou 465 (SSL)
- Vérifiez que le firewall autorise les connexions sortantes

### Problème : "SSL/TLS error"

**Solution** :
- Assurez-vous que `EMAIL_ENABLE_SSL=true`
- Utilisez le port 587 avec STARTTLS ou 465 avec SSL direct

## 📚 Exemples d'utilisation

### Backend (C#)

```csharp
// Injecter IEmailService
private readonly IEmailService _emailService;

// Envoyer un email simple
await _emailService.SendEmailAsync(
    "user@example.com",
    "Bienvenue sur SuribassMusic",
    "<h1>Bienvenue !</h1><p>Merci de vous être inscrit.</p>",
    isHtml: true
);

// Envoyer à plusieurs destinataires
await _emailService.SendBulkEmailAsync(
    new[] { "user1@example.com", "user2@example.com" },
    "Newsletter SuribassMusic",
    emailBody,
    isHtml: true
);
```

### Frontend (TypeScript/React)

```typescript
// Tester la connexion SMTP
const testConnection = async () => {
  const response = await fetch('/api/v1/email/test-connection', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${adminToken}`,
    },
  });
  const result = await response.json();
  console.log(result.data.isSuccess ? 'Connexion OK' : 'Échec');
};

// Envoyer un email de test
const sendTestEmail = async (toEmail: string) => {
  const response = await fetch('/api/v1/email/test-send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ toEmail }),
  });
  return await response.json();
};
```

## 🎯 Cas d'utilisation

1. **Notification de bienvenue** : Envoyer un email lors de l'inscription
2. **Réinitialisation de mot de passe** : Envoyer un lien de réinitialisation
3. **Notifications** : Alerter les utilisateurs de nouveaux contenus
4. **Modération** : Notifier les admins des contenus à modérer
5. **Newsletter** : Envoyer des newsletters aux abonnés

## 📖 Ressources

- [Configuration IONOS SMTP](https://www.ionos.fr/assistance/email/parametres-de-serveur-pop-imap-et-smtp/)
- [System.Net.Mail Documentation](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail)

---

**Dernière mise à jour** : 1 décembre 2024
