# E09 — Priority URLs (Website Topic) + Week-1 Measure

**Nguồn:** `topic-battlefield-website-v1.md` (LOCKED)  
**Mục tiêu:** organic + rank → `/website` và `/banggia`

---

## A. Money Pages (đã sửa Day-1 — chỉ theo dõi)

| URL | Primary KW | Việc tiếp |
|-----|------------|-----------|
| `/website` | thiết kế website | Đo GSC/rank hàng tuần |
| `/banggia` | báo giá thiết kế website | Đo GSC/rank hàng tuần |
| `/facebook` | (Phase FB sau) | Giữ CTA đúng |
| `/google-maps` | (Phase Maps sau) | Giữ CTA đúng |

---

## B. Content ưu tiên nuôi Money Page (Cursor — pass Publish Gate)

Thứ tự rewrite/kiểm tra internal link (primary CTA → Money Page):

| # | Slug / URL | Intent | Money Page đích |
|---|------------|--------|-----------------|
| 1 | `/blog/thiet-ke-website` | informational | `/website` |
| 2 | `/blog/bao-gia-thiet-ke-website` | informational→transactional | `/banggia` |
| 3 | `/blog/chu-de/website` | hub | `/website` + `/banggia` |
| 4 | Top bài `hot` KW chứa “thiết kế website” (10 URL) | commercial/info | `/website` |
| 5 | Top bài KW “báo giá” / “chi phí” website (5 URL) | transactional | `/banggia` |

**Không** tạo slug mới nếu trùng Intent/KW với bảng trên.

---

## C. Đã sửa trong code / DB

- `/blog` growth pillars → 3 Money Page  
- `/blog` CTA chính → `/website`  
- `MONEY_KW_TARGETS`: head/local/ngành primary dồn về `/website` hoặc `/banggia`  
- **E11:** pillar `thiet-ke-website` + `bao-gia-thiet-ke-website` — bỏ `/lien-he`, `/seo-website`  
- **E12:** 40 bài hot cụm Website — `/lien-he`→`/banggia`, `/seo-website`→`/website`, sub FB/Maps→Money Page  
- **E13:** quét toàn bộ 15.444 bài published — **655** bài liên quan website đã patch · **0 fail**  

**Lưu ý:** cache blog ISR ~1h; deploy/revalidate để live sớm hơn.

---

## D. Week-1 Measure (E10) — làm tay mỗi tuần

Ngày đo: ___________

| Metric | `/website` | `/banggia` | Ghi chú |
|--------|------------|------------|---------|
| Rank “thiết kế website” (VN) | | — | |
| Rank “báo giá thiết kế website” | — | | |
| GSC clicks (7 ngày) | | | |
| GSC impressions (7 ngày) | | | |
| Top query → URL (đúng/sai) | | | Sai = ưu tiên sửa tuần sau |

**SoV Topic Website (đơn giản):**  
% KW trong Battlefield (commercial+transactional list) đang **Top 10** = _____ / _____ = _____%

Baseline tuần 0: ghi số lần đầu → so tuần sau. Không tối ưu PageView.
