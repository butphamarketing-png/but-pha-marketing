# Full Product Spec - AI SEO Content Platform

## 1. Muc tieu san pham

Xay dung mot he thong AI SEO content platform co the:
- Tao bai viet tu y tuong hoac title
- Danh gia va toi uu SEO
- Theo doi rank keyword theo thoi gian
- Phat hien bai dang suy giam hieu suat
- Tu dong de xuat cap nhat noi dung
- Go y internal link va topical cluster
- Phan tich SERP va co hoi noi dung
- Ho tro publish, index va dashboard tong quan
- Co kha nang mo rong qua plugin

Muc tieu cuoi cung la tao mot tool gan voi:
- Ahrefs cho phan tich
- SurferSEO cho content optimization
- AIKTP cho AI writing
- WordPress cho mo rong plugin

## 2. Pham vi san pham

### 2.1 Core modules
- Content Creation
- SEO Score
- Keyword & Rank Tracking
- Rank Decay Detection
- AI Refresh
- Internal Link Suggestion
- Interlink Old Posts
- Topical Cluster
- SERP Analysis
- Image Suggestion
- Content Opportunity
- Auto Publish + Index
- Global Dashboard
- Plugin System

### 2.2 Nen tang bat buoc
- Authentication and authorization
- Project/site management
- Workflow draft/review/approve/publish
- Version history
- Audit log
- Notification system
- Queue/job system
- Settings cho brand voice, locale, search engine
- Integration layer
- Billing/usage tracking neu lam SaaS

## 3. Muc do uu tien

### 3.1 MVP
- Tao bai viet AI
- Outline approval
- Viet full bai
- SEO score co ban
- Rank tracking co ban
- SERP analysis co ban
- Internal link suggestion
- Dashboard tong quan

### 3.2 V1
- Rank decay detection
- AI refresh draft
- Topical cluster
- Content opportunity
- Image suggestion
- Auto publish
- Index ping
- Version history

### 3.3 V2
- Plugin system
- Multi-site management
- Advanced workflow
- Team roles
- Billing
- Public API
- Webhook

## 4. Chuc nang chi tiet

### 4.1 Content Creation

Input:
- Title
- Primary keyword
- Target locale
- Tone of voice
- Content type
- Target length

Flow:
1. Nguoi dung nhap title.
2. AI de xuat primary keyword, secondary keyword, search intent.
3. AI tao outline H1/H2/H3.
4. Nguoi dung duyet hoac sua outline.
5. AI viet full article.
6. AI toi uu heading, keyword usage, CTA, FAQ, conclusion.
7. Bai duoc luu vao draft.

Output:
- Draft article
- Metadata
- Keyword set
- Outline tree
- Suggested internal links

### 4.2 SEO Score

Kiem tra:
- Mat do keyword
- Co mat key phrase trong title, H1, H2
- Do dai bai
- Readability
- Internal link count
- External link count
- Image presence
- Alt text
- Heading structure
- FAQ/schema presence

Output:
- Score 0-100
- Danh sach loi
- Gop y fix
- Muc do anh huong

### 4.3 Keyword & Rank Tracking

Tinh nang:
- Track keyword theo bai viet
- Luu lich su rank
- So sanh hom nay vs hom qua
- So sanh theo tuan/thang
- Phan biet device/locale/search engine

Output:
- Rank hien tai
- Bien dong
- Chart history
- Top 1-100

### 4.4 Rank Decay Detection

Trigger:
- Giam hon 5 bac trong mot chu ky
- Roi khoi top 10
- Giam lien tiep X ngay

Output:
- needsUpdate = true
- Alert
- Reason code

### 4.5 AI Refresh

Flow:
1. Lay bai hien tai.
2. So sanh voi top results SERP.
3. Phan tich content gap.
4. Tao ban draft moi.
5. De xuat section can them, doan can viet lai, keyword can chen.
6. Nguoi dung duyet truoc khi overwrite.

Rules:
- Khong auto overwrite
- Chi tao draft
- Luu version cu

### 4.6 Internal Link Suggestion

Tinh nang:
- Go y bai lien quan
- Go y anchor text
- Go y vi tri chen link

Output:
- Source post
- Target post
- Anchor text
- Confidence score

### 4.7 Interlink Old Posts

Tinh nang:
- Tim bai cu co the tro ve bai moi
- Tao danh sach add link ngan hanh
- Canh bao bai cu co traffic cao nen uu tien cap nhat

### 4.8 Topical Cluster

Output:
- Pillar topic
- Cluster topics
- Supporting articles
- Internal linking map

Use cases:
- Tao content plan
- Mo rong topical authority

### 4.9 SERP Analysis

Lay:
- Top 10 results
- Heading structure
- Do dai
- Content angle
- FAQ
- Schema hints

Output:
- Content gap
- Suggested outline
- Competitive difficulty note

### 4.10 Image Suggestion

Tinh nang:
- De xuat image phu hop
- Go y vi tri chen
- Tao alt text
- Luu source URL va license note neu can

### 4.11 Content Opportunity

Tinh nang:
- Tim keyword de rank
- Tim content gap toan site
- Tim bai co search intent ro nhung site chua cover

Output:
- Opportunity list
- Priority
- Estimated effort
- Expected impact

### 4.12 Auto Publish + Index

Flow:
1. Duyet draft
2. Publish len CMS
3. Ping index
4. Track index status

Rules:
- Co manual approval gate
- Co retry khi publish/index fail

### 4.13 Global Dashboard

Hien thi:
- Tong so bai
- So bai dang rank down
- SEO score trung binh
- Traffic estimate
- Bai can refresh
- Bai co opportunity

### 4.14 Plugin System

Plugin co the:
- Them tool SEO
- Them AI workflow
- Them schema generator
- Them analytics connector
- Them CMS connector

Yeu cau:
- Registry plugin
- Permission scope
- Version compatibility
- Isolated execution contract

## 5. Cac vai tro nguoi dung

- Admin
- Editor
- SEO Manager
- Content Writer
- Viewer

Quyen:
- Admin: full access
- SEO Manager: duyet SEO, xem report, refresh content
- Editor: sua noi dung, duyet outline
- Writer: tao draft
- Viewer: chi doc

## 6. Data model co ban

### 6.1 Entities
- User
- Workspace
- Project
- Site
- Article
- ArticleVersion
- Keyword
- RankSnapshot
- SerpSnapshot
- SeoScore
- InternalLinkSuggestion
- ContentOpportunity
- Cluster
- Plugin
- PublishJob
- IndexJob
- Notification

### 6.2 Quan he
- Workspace co nhieu Project
- Project co nhieu Site
- Site co nhieu Article
- Article co nhieu Version
- Article co nhieu Keyword
- Keyword co nhieu RankSnapshot
- Article co nhieu SeoScore snapshot

## 7. Workflow chuan

### 7.1 Tao bai moi
1. Tao title
2. AI de xuat keyword
3. AI tao outline
4. Duyet outline
5. AI viet full draft
6. SEO score
7. Chen internal links
8. Duyet final
9. Publish
10. Index

### 7.2 Refresh bai cu
1. He thong detect rank decay
2. Tao refresh task
3. Lay SERP top 10
4. Tao content gap report
5. Tao draft moi
6. Nguoi dung duyet
7. Publish version moi

## 8. Non-functional requirements

- Fast response cho task nho
- Queue cho task AI dai
- Retry co backoff
- Rate limit cho API ngoai
- Logging day du
- Audit trail
- Secure secret storage
- Multi-tenant isolation
- Backup and restore
- Observability: metrics, traces, logs

## 9. Acceptance criteria

### 9.1 Content Creation
- Tao duoc outline tu title
- Viet duoc full draft
- Luu version

### 9.2 SEO Score
- Co diem so ro rang
- Co list loi can fix

### 9.3 Rank Tracking
- Luu lich su rank
- Hien thi xu huong

### 9.4 Refresh
- Khong overwrite truc tiep
- Tao draft moi

### 9.5 Dashboard
- Xem duoc so lieu tong quan

## 10. Roadmap de xay dung

### Phase 1
- Auth
- Project/site
- Article editor
- Outline + writing AI
- SEO score
- Dashboard basic

### Phase 2
- Rank tracking
- SERP analysis
- Internal links
- Rank decay
- AI refresh

### Phase 3
- Clusters
- Content opportunity
- Auto publish/index
- Plugin system
- Billing

## 11. Risk can chu y

- Du lieu SERP can on dinh va hop le
- Rank tracking co the bi gioi han boi API/provider
- AI refresh can co guardrail tranh sua sai
- Plugin system phai co sandbox ro rang
- Multi-tenant can tranh lo data

## 12. Ket luan

Neu lam theo spec nay, san pham se khong chi la tool viet bai AI, ma la mot platform SEO content hoan chinh co kha nang mo rong lau dai.

## 13. Ghi chu thuc thi

Uu tien lam:
1. Core content creation
2. SEO score
3. Rank tracking
4. Refresh draft
5. Dashboard

Sau do moi mo rong sang:
- Plugin
- Billing
- Multi-site
- Automation nang cao
