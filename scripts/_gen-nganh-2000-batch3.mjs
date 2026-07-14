/**
 * Sinh 2000 ngành nghề mới (batch 3), không trùng slug đã có (~1500).
 * Chạy: node scripts/_gen-nganh-2000-batch3.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const existing = new Set(
  JSON.parse(fs.readFileSync(path.join(root, "tmp-programmatic", "_existing-slugs-all.json"), "utf8")),
);

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-+/g, "-");
}

const seen = new Set([...existing]);
const niches = [];

function add(label, slugHint) {
  let slug = slugHint || slugify(label);
  if (!slug || slug.length < 2) return false;
  if (seen.has(slug)) {
    let i = 2;
    while (seen.has(`${slug}-v${i}`)) i++;
    // Prefer skip duplicates rather than -v2 for ngành purity
    return false;
  }
  seen.add(slug);
  niches.push({ label, slug });
  return true;
}

/** Add many from [prefix, items] or [items, suffix] */
function addPrefixed(prefix, items) {
  for (const item of items) add(`${prefix} ${item}`, slugify(`${prefix}-${item}`));
}
function addSuffixed(items, suffix) {
  for (const item of items) add(`${item} ${suffix}`, slugify(`${item}-${suffix}`));
}
function addTpl(tpl, items) {
  for (const item of items) {
    const label = tpl.replace("{x}", item);
    add(label, slugify(label));
  }
}

// ——— curated one-offs (high value) ———
const CURATED = [
  ["Quán bánh cuốn Thanh Trì", "banh-cuon-thanh-tri"],
  ["Quán bún đậu mắm tôm", "bun-dau-mam-tom"],
  ["Quán chả cá Lã Vọng", "cha-ca-la-vong"],
  ["Quán phá lấu", "pha-lau"],
  ["Quán lòng heo", "long-heo"],
  ["Quán bò lúc lắc", "bo-luc-lac"],
  ["Quán gà nướng", "ga-nuong"],
  ["Quán vịt quay", "vit-quay"],
  ["Quán heo quay", "heo-quay"],
  ["Quán ếch xào", "ech-xao"],
  ["Quán ốc luộc", "oc-luoc"],
  ["Quán nghêu nướng mỡ hành", "ngheu-nuong"],
  ["Quán hào nướng", "hao-nuong"],
  ["Quán sushi conveyor", "sushi-conveyor"],
  ["Quán yakiniku", "yakiniku"],
  ["Quán shabu shabu", "shabu-shabu"],
  ["Quán steamboat", "steamboat"],
  ["Quán BBQ Hàn buffet", "bbq-han-buffet"],
  ["Quán pizza lò củi", "pizza-lo-cui"],
  ["Quán burger gourmet", "burger-gourmet"],
  ["Quán steak nhà hàng", "steak-nha-hang"],
  ["Quán pasta Ý", "pasta-y"],
  ["Quán taco Mexico", "taco-mexico"],
  ["Quán falafel", "falafel"],
  ["Quán hummus", "hummus"],
  ["Quán curry Ấn", "curry-an"],
  ["Quán biryani", "biryani"],
  ["Quán pad thái", "pad-thai"],
  ["Quán tom yum", "tom-yum"],
  ["Quán lẩu Thái", "lau-thai"],
  ["Quán lẩu nấm chay", "lau-nam-chay"],
  ["Quán hotpot Chongqing", "hotpot-chongqing"],
  ["Quán xôi gà", "xoi-ga"],
  ["Quán xôi xéo", "xoi-xeo"],
  ["Quán bánh mì que", "banh-mi-que"],
  ["Quán bánh mì chả cá", "banh-mi-cha-ca"],
  ["Quán bánh đúc", "banh-duc"],
  ["Quán bánh bèo", "banh-beo"],
  ["Quán bánh bột lọc", "banh-bot-loc"],
  ["Quán bánh hỏi", "banh-hoi"],
  ["Quán bánh tráng trộn", "banh-trang-tron"],
  ["Quán gỏi cuốn", "goi-cuon"],
  ["Quán nem nướng", "nem-nuong"],
  ["Quán chè Thái", "che-thai"],
  ["Quán chè khúc bạch", "che-khuc-bach"],
  ["Quán tàu hũ", "tau-hu"],
  ["Quán sữa đậu nành", "sua-dau-nanh"],
  ["Quán trà chanh", "tra-chanh"],
  ["Quán trà đào", "tra-dao-quan"],
  ["Quán trà mật ong", "tra-mat-ong"],
  ["Quán cà phê muối", "ca-phe-muoi"],
  ["Quán cà phê cốt dừa", "ca-phe-cot-dua"],
  ["Quán bạc xỉu", "bac-xiu"],
  ["Quán sinh tố bơ", "sinh-to-bo"],
  ["Quán nước mía", "nuoc-mia"],
  ["Quán nước sâm", "nuoc-sam"],
  ["Quán nước sắn", "nuoc-san"],
  ["Tiệm bánh su kem", "banh-su-kem"],
  ["Tiệm bánh tiramisu", "tiramisu"],
  ["Tiệm bánh cheese", "banh-cheese"],
  ["Tiệm bánh tart", "banh-tart"],
  ["Tiệm bánh cookie", "banh-cookie"],
  ["Xưởng bánh mì sandwich", "banh-mi-sandwich"],
  ["Xưởng bánh pizza đông lạnh", "pizza-dong-lanh"],
  ["Cloud kitchen cơm tấm", "cloud-com-tam"],
  ["Ghost kitchen trà sữa", "ghost-tra-sua"],
  ["Dark store thực phẩm", "dark-store"],
];
for (const [l, s] of CURATED) add(l, s);

// ——— F&B verbs / types ———
const MON_AN = [
  "bún ốc", "bún riêu cua", "bún cá", "bún thịt nướng", "bún đậu", "bún mắm nêm",
  "phở gà", "phở bò tái", "phở cuốn", "miến lươn", "hủ tiếu xương", "hủ tiếu khô",
  "mì cay", "mì ý", "mì xào", "mì trộn", "mì quảng ếch", "bánh canh cua",
  "bánh canh giò", "cháo ếch", "cháo cá", "cháo sườn", "cháo gà", "súp cua",
  "cơm chiên", "cơm rang", "cơm suối", "cơm phần", "cơm văn phòng chay",
  "lẩu cá kèo", "lẩu hải sản", "lẩu gà lá é", "lẩu bò nhúng dấm", "lẩu ếch",
  "nướng than hoa", "nướng lá lốt", "nem nướng Nha Trang", "chả ram",
  "gỏi gà", "gỏi bò", "gỏi hải sản", "gỏi cuốn tôm thịt", "nem chua",
  "chả giò", "hoành thánh", "há cảo", "xíu mại", "sủi cảo", "dim sum hấp",
  "cơm tấm sườn", "cơm gà Hội An", "cơm cháy", "bánh căn", "bánh khọt",
  "bánh ướt", "bánh đập", "bánh lọt", "chè ba màu", "chè đỗ đen",
  "kem cuộn", "kem matcha", "yogurt đá", "sinh tố dâu", "nước ép cam",
  "trà sữa trân châu", "trà sữa matcha", "trà sữa thái", "cà phê phin",
  "cà phê cold brew", "cà phê nitro", "matcha đác", "cacao nóng",
];
addPrefixed("Quán", MON_AN);

const NONG_SAN = [
  "sầu riêng Musang King", "sầu riêng Thai Monthong", "bưởi da xanh", "bưởi đường lá cam",
  "cam xoàn", "cam canh", "quýt đường", "quýt hồng", "chanh không hạt", "chanh giấy",
  "ổi nữ hoàng", "ổi ruby", "mãng cầu na", "mãng cầu xiêm", "măng cụt", "chôm chôm Java",
  "nhãn xuồng cơm vàng", "vải thiều Thanh Hà", "vải sớm", "đào tuyết", "mận hậu",
  "dâu tây Nhật", "việt quất", "phúc bồn tử", "nho xanh không hạt", "táo đỏ Mỹ",
  "lê Hàn", "kiwi vàng", "dưa lưới Nhật", "dưa lê", "bí ngồi", "bí đỏ Nhật",
  "cà tím Nhật", "cà chua bi", "ớt hiểm", "ớt trái cây", "ớt chuông", "dưa leo baby",
  "rau muống hữu cơ", "rau cải bó xôi", "xà lách lô lô", "cải kale", "bông cải xanh",
  "súp lơ trắng", "cà rốt baby", "củ cải đường", "khoai tây Đà Lạt", "khoai môn",
  "sắn dây", "củ năng", "sen hồ", "hạt sen tươi", "ngó sen", "rau má",
  "lá lốt", "lá mắc mật", "lá giang", "lá me", "lá chanh", "tia tô",
  "gừng tươi", "nghệ tươi", "sả cây", "riềng", "hành tím Phan Rang", "tỏi cô đơn",
  "hạt tiêu đen", "hạt tiêu trắng", "đinh hương", "quế thanh", "thảo quả",
  "cà phê Arabica", "cà phê Robusta honey", "cacao nguyên chất", "trà ô long",
  "trà sen Tây Hồ", "trà shan tuyết cổ thụ", "trà xanh Thái Nguyên", "trà atiso",
  "gạo ST25", "gạo Japonica", "gạo lứt đỏ", "gạo nếp cái hoa vàng", "ngô ngọt",
  "lúa mì", "đậu xanh", "đậu đen", "đậu nành hữu cơ", "đậu Hà Lan",
  "hạt macca", "hạt óc chó", "hạt hạnh nhân", "hạt điều rang muối", "hạt dẻ cười",
  "nấm linh chi đỏ", "nấm đông trùng", "nấm hương khô", "nấm mỡ", "nấm tuyết",
];
addPrefixed("Vựa", NONG_SAN);
addPrefixed("Shop", ["hạt dinh dưỡng", "granola mix", "yến mạch cán", "bột protein thực vật", "bột collagen cá", "bột nghệ curcumin", "bột cacao", "siro maple", "mật ong hoa cỏ", "mật ong bạc hà"]);

const CHAN_NUOI = [
  "gà ta", "gà Đông Tảo", "gà Hồ", "gà Ác", "gà tre", "vịt cỏ", "vịt bầu",
  "ngỗng", "chim cút đẻ", "bồ câu", "heo đen Mường", "heo rừng lai",
  "dê núi", "dê sữa", "cừu", "bò Wagyu", "bò sữa HF", "trâu",
  "cá trắm", "cá mè", "cá trôi", "cá chép giòn", "cá tầm", "cá hồi",
  "tôm sú", "tôm hùm", "tôm càng", "cua biển", "ghẹ", "ốc hương",
  "bào ngư", "hàu sữa", "nghêu Bến Tre", "sò huyết", "mực ống",
  "ong dú", "ong mật Italia", "tằm", "giun quế", "dế", "ấu trùng ruồi lính đen",
];
addPrefixed("Trại", CHAN_NUOI);
addPrefixed("Nuôi", ["lươn đồng", "ếch thái", "ba ba", "rùa", "cá kiểng koi", "cá rồng", "cá bảy màu", "cá đuôi cờ"]);

// fashion
const FASHION = [
  "áo sơ mi nam", "áo thun oversize", "áo polo", "áo hoodie unisex", "áo khoác bomber",
  "áo blazer nữ", "áo dài cách tân", "váy công sở", "váy dự tiệc", "váy maxi",
  "chân váy xếp ly", "quần tây nam", "quần jogger", "quần short thể thao", "quần legging",
  "jean skinny", "jean ống rộng", "set đồ bộ nữ", "đồ ngủ lụa", "đồ mặc nhà",
  "áo chống nắng", "áo mưa bộ", "đồ bảo hộ lao động", "áo khoác gió", "áo len cardigan",
  "túi tote canvas", "túi đeo chéo", "ba lô laptop", "ví dài nữ", "ví nam da bò",
  "giày thể thao nữ", "giày da nam", "giày cao gót", "dép quai hậu", "sandal nữ",
  "mũ lưỡi trai", "nón bucket", "khăn choàng lụa", "thắt lưng da bò", "vớ thể thao",
  "đồ bơi nữ", "đồ bơi nam", "đồ lót cotton", "áo ngực thể thao", "đồ bầu công sở",
  "đồ trẻ em", "đồng phục nhà hàng", "đồng phục barista", "đồng phục spa", "áo thun team building",
];
addPrefixed("Shop", FASHION);
addPrefixed("Xưởng may", ["áo thun theo yêu cầu", "hoodie in logo", "đồng phục công ty", "áo dài cưới", "vest nam"]);

// beauty
const BEAUTY = [
  "nail Hàn", "nail Nhật", "sơn gel", "nối mi volume", "nối mi classic",
  "uốn mi", "phun môi kỹ thuật số", "phun mày Ombre", "phun mí mắt",
  "điêu khắc chân mày", "đắp bột nail", "nail đính đá", "wax lông mặt",
  "wax Bikini", "tẩy tế bào chết body", "ủ trắng body", "tắm trắng nano",
  "chăm sóc da mặt cơ bản", "chăm sóc da mụn", "chăm sóc da lão hóa",
  "massage body Thái", "massage foot Nhật", "massage đá nóng", "gội đầu thảo dược",
  "uốn tóc nóng", "uốn lạnh", "duỗi tóc", "tóc highlight", "tóc balayage",
  "cắt tóc nam", "cạo mặt nam", "gội đầu nam", "làm tóc cô dâu", "makeup dự tiệc",
];
addPrefixed("Tiệm", BEAUTY);
addPrefixed("Spa", ["detox", "đá muối Himalaya", "tinh dầu lavender", "cho bà bầu", "cặp đôi"]);
addPrefixed("Clinic", ["laser CO2", "laser Pico", "triệt lông Diode", "mesotherapy", "PRP da"]);

// medical
const Y_TE = [
  "đa khoa", "nhi khoa", "sản phụ khoa", "tai mũi họng", "mắt", "răng hàm mặt",
  "da liễu", "tim mạch", "nội tiết", "tiêu hóa", "hô hấp", "thần kinh",
  "cơ xương khớp", "thận tiết niệu", "nam khoa", "phụ khoa", "vô sinh hiếm muộn",
  "ung bướu", "huyết học", "dinh dưỡng lâm sàng", "tâm lý trị liệu", "tâm thần",
  "chẩn đoán hình ảnh", "siêu âm", "xét nghiệm máu", "nội soi", "vật lý trị liệu",
  "phục hồi chức năng", "châm cứu", "bấm huyệt", "đông y", "y học cổ truyền",
];
addPrefixed("Phòng khám", Y_TE);
addPrefixed("Trung tâm", ["tiêm chủng dịch vụ", "tầm soát ung thư", "xét nghiệm gen", "IVF", "thẩm mỹ da"]);
addPrefixed("Nha khoa", ["implant All-on-4", "răng sứ zirconia", "niềng Invisalign", "nhổ răng khôn", "tẩy trắng răng"]);

// education
const GIAO_DUC = [
  "IELTS foundation", "IELTS advanced", "TOEIC 800+", "TOEFL iBT", "SAT Math",
  "GRE Verbal", "GMAT", "HSK 4", "HSK 5", "TOPIK 3", "JLPT N3", "JLPT N2",
  "DELF B1", "Goethe B1", "tiếng Nga sơ cấp", "tiếng Tây Ban Nha A2", "tiếng Thái giao tiếp",
  "Anh văn mẫu giáo", "Anh văn tiểu học", "Anh văn thiếu niên", "Anh văn doanh nghiệp",
  "tiếng Việt cho người nước ngoài", "gia sư Toán lớp 12", "gia sư Lý", "gia sư Hóa",
  "luyện thi đại học khối A", "luyện thi khối D", "luyện thi năng lực VNU", "luyện thi tư duy Bách Khoa",
  "lập trình Python cơ bản", "lập trình web", "lập trình mobile", "data analysis",
  "Excel nâng cao", "Power BI", "kế toán thực tế", "digital marketing cơ bản",
  "SEO onpage", "Facebook Ads thực chiến", "TikTok Shop", "thiết kế Canva",
  "Photoshop cơ bản", "Illustrator", "Premiere cơ bản", "After Effects cơ bản",
  "vẽ chì", "vẽ màu nước", "vẽ digital", "piano người lớn", "guitar fingerstyle",
  "ukulele", "thanh nhạc", "múa hiện đại", "ballet cơ bản", "hiphop cơ bản",
  "yoga cơ bản", "yoga aerial", "pilates mat", "võ karate", "võ Boxing",
  "bơi ếch", "bơi sải", "cờ vua nâng cao", "cờ tướng", "robotics Arduino",
];
addPrefixed("Trung tâm", GIAO_DUC);
addPrefixed("Lớp", ["nấu ăn gia đình", "làm bánh ngọt", "pha chế trà sữa", "barista specialty", "làm nail", "makeup cá nhân", "MC sự kiện", "thuyết trình"]);

// construction
const XAY_DUNG = [
  "nhà phố 1 trệt 2 lầu", "nhà cấp 4 mái Thái", "biệt thự vườn", "nhà gỗ lim",
  "cải tạo mặt tiền", "cải tạo phòng ngủ", "cải tạo nhà bếp", "cải tạo WC",
  "sơn nước cao cấp", "sơn epoxy sàn nhà xưởng", "chống thấm nhà vệ sinh", "chống thấm mái",
  "lát gạch granite", "ốp tường đá marble", "lát sàn SPC", "lát sàn gỗ tự nhiên",
  "trần thạch cao giật cấp", "trần nhôm", "vách thạch cao", "vách kính văn phòng",
  "cửa nhôm kính", "cửa gỗ HDF", "cửa thép chống cháy", "cổng sắt CNC",
  "mái tôn lạnh", "mái ngói Nhật", "mái kính cường lực", "giàn hoa sắt",
  "lan can kính cường lực", "cầu thang gỗ lim", "cầu thang sắt nghệ thuật",
  "hệ thống điện dân dụng", "hệ thống nước sinh hoạt", "bể phốt tự hoại", "giếng khoan",
  "ép cọc tre", "ép cốt thép", "đổ bê tông móng", "xây tường bao",
];
addPrefixed("Thi công", XAY_DUNG);
addPrefixed("Cửa hàng", ["gạch men", "gạch granite", "xi măng PCB40", "cát xây", "đá 1x2", "sắt phi", "tôn lợp", "keo dán gạch", "keo silicone", "sơn dầu"]);
addPrefixed("Thiết kế", ["nội thất phòng khách", "nội thất phòng ngủ", "nội thất quán cafe", "nội thất spa", "nội thất showroom", "nội thất văn phòng mở"]);

// auto / transport
const XE = [
  "ô tô sedan cũ", "ô tô SUV cũ", "xe bán tải cũ", "xe tải nhẹ", "xe khách 16 chỗ",
  "xe máy Honda Vision", "xe máy Yamaha Exciter", "xe máy SH", "xe máy điện VinFast",
  "xe đạp điện", "xe máy số", "xe tay ga", "xe phân khối lớn",
];
addPrefixed("Mua bán", XE);
addPrefixed("Gara", ["đồng sơn", "điện máy ô tô", "điều hòa ô tô", "hộp số tự động", "phun xăng điện tử", "phanh ABS", "lốp ô tô", "ắc quy"]);
addPrefixed("Cho thuê", ["xe 4 chỗ tự lái", "xe 7 chỗ", "xe 16 chỗ", "xe tải 1 tấn", "xe container", "xe nâng", "xe lu đường", "máy xúc", "cẩu tháp"]);
addPrefixed("Dịch vụ", ["cứu hộ 24/7", "đăng kiểm hộ", "bảo dưỡng định kỳ", "rửa xe hơi", "đánh bóng xe", "dán PPF full xe", "phủ ceramic 9H"]);

// tech
const TECH = [
  "website giới thiệu công ty", "website bán hàng", "website bất động sản", "website giáo dục",
  "landing page thu lead", "landing page sự kiện", "app đặt lịch", "app giao đồ ăn",
  "phần mềm quản lý kho", "phần mềm bán hàng POS", "phần mềm kế toán", "CRM bán hàng",
  "chatbot Facebook", "chatbot Zalo", "tích hợp thanh toán", "cổng thanh toán",
  "Google Ads search", "Google Ads shopping", "Meta Ads conversion", "TikTok Ads spark",
  "SEO website thương mại", "SEO local Maps", "content marketing", "email drip",
  "quay video sản phẩm", "edit short video", "chụp ảnh lookbook", "thiết kế bao bì",
  "thiết kế logo", "thiết kế bộ nhận diện", "UI/UX app", "no-code Webflow",
];
addPrefixed("Dịch vụ", TECH);
addPrefixed("Agency", ["performance marketing", "branding", "social media", "KOL booking", "influencer marketing", "PR báo chí", "event marketing"]);
addPrefixed("Cửa hàng", ["máy tính gaming", "linh kiện PC", "màn hình LG", "chuột logitech", "bàn phím cơ custom", "webcam", "micro livestream", "đèn ring light"]);

// printing / ads
const IN_AN = [
  "namecard", "flyer", "brochure", "catalogue", "poster", "banner cuốn",
  "standee X", "backdrop", "băng rôn", "decal dán kính", "decal xe",
  "tem bảo hành", "tem chống hàng giả", "nhãn chai", "túi ni lông in",
  "túi giấy kraft", "hộp carton sóng", "hộp cứng âm dương", "ly giấy",
  "áo thun sự kiện", "mũ lưỡi trai in logo", "ô dù in logo", "USB in logo",
];
addPrefixed("In", IN_AN);
addPrefixed("Làm", ["biển Alu chữ nổi", "biển mica LED", "biển hộp đèn", "biển vẫy", "cổng chào sự kiện", "gian hàng booth"]);

// travel
const TOUR = [
  "Hạ Long 2N1Đ", "Ninh Bình 1 ngày", "Sapa 3N2Đ", "Hà Giang loop", "Mai Châu",
  "Mộc Châu", "Tam Đảo", "Đà Nẵng 3N2Đ", "Hội An", "Huế", "Quảng Bình",
  "Nha Trang 3N2Đ", "Đà Lạt 3N2Đ", "Phan Thiết", "Phú Quốc 3N2Đ", "Côn Đảo",
  "miền Tây 2N1Đ", "Cần Thơ", "Châu Đốc", "Hà Tiên", "buôn Đắk Lắk",
  "Pleiku", "Kon Tum", "Đà Lạt săn mây", "Fansipan trekking", "Tà Xùa",
  "Bãi Cháy", "Cát Bà", "Đồ Sơn", "Sam Sơn", "Cửa Lò", "Lý Sơn",
];
addPrefixed("Tour", TOUR);
addPrefixed("Homestay", ["view núi", "view ruộng bậc thang", "nhà sàn", "container", "nhà gỗ"]);
addPrefixed("Resort", ["spa", "all-inclusive", "gia đình", "honeymoon", "glamping"]);

// pet
const PET = [
  "chó Poodle", "chó Corgi", "chó Golden", "chó Husky", "chó Phú Quốc",
  "mèo Ba Tư", "mèo Anh lông dài", "mèo Scottish", "mèo Sphynx", "mèo Munchkin",
  "hamster bear", "thỏ Holland", "nhím kiểng", "sóc bay", "bọ Ú",
  "chim vành khuyên", "chim họa mi", "chim chào mào", "vẹt grey", "vẹt sun conure",
  "cá bảy màu", "cá đĩa", "cá la hán", "cá vàng", "cá koi F1",
];
addPrefixed("Shop", PET);
addPrefixed("Dịch vụ", ["spa chó", "cắt tỉa lông chó", "trông giữ thú cưng", "đưa thú đi khám", "mai táng thú cưng"]);

// real estate / legal / finance
const BDS = [
  "căn hộ trung tâm", "căn hộ ven sông", "nhà phố liền kề", "biệt thự đơn lập",
  "đất nền dự án", "đất thổ cư", "đất nông nghiệp", "kho xưởng", "mặt bằng kinh doanh",
  "văn phòng hạng A", "shophouse", "condotel", "officetel", "nhà trọ sinh viên",
];
addPrefixed("Môi giới", BDS);
addPrefixed("Cho thuê", ["căn hộ dịch vụ", "phòng trọ", "nhà nguyên căn", "mặt bằng mặt tiền", "kho lạnh"]);
addPrefixed("Dịch vụ", ["công chứng nhà đất", "sang tên sổ đỏ", "xin phép xây dựng", "hoàn công", "thẩm định giá BĐS", "quản lý vận hành tòa nhà"]);
addPrefixed("Tư vấn", ["vay mua nhà ngân hàng", "vay kinh doanh", "bảo hiểm nhân thọ", "bảo hiểm sức khỏe", "đầu tư chứng khoán cơ bản", "kế hoạch thuế doanh nghiệp"]);

// industrial / B2B
const CN = [
  "CNC 3 trục", "CNC 5 trục", "cắt laser fiber", "cắt plasma", "hàn TIG",
  "hàn MIG", "gia công tiện", "gia công phay", "đúc nhôm", "đúc gang",
  "ép nhựa injection", "thổi nhựa", "in 3D metal", "sơn tĩnh điện", "mạ kẽm",
  "cán tôn", "uốn thép", "kéo dây", "dập khuôn", "cắt ống thép",
];
addPrefixed("Gia công", CN);
addPrefixed("Xưởng", ["bao bì mềm", "túi zipper", "màng PE", "carton offset", "tem nhãn decal", "pallet nhựa", "thùng nhựa", "khay nhựa"]);
addPrefixed("Đại lý", ["ổn áp", "biến tần", "motor điện", "bơm ly tâm", "van công nghiệp", "ống PPR", "ống HDPE", "cáp điện", "áp tô mát", "ổ cắm công nghiệp"]);

// appliances
const DIEN_MAY = [
  "máy lạnh inverter", "máy lạnh âm trần", "máy giặt cửa ngang", "máy giặt sấy",
  "tủ lạnh side by side", "tủ đông", "tủ mát siêu thị", "bếp từ đôi",
  "lò nướng âm", "lò vi sóng", "máy hút mùi kính", "máy rửa bát",
  "máy lọc nước nóng lạnh", "máy lọc không khí HEPA", "quạt không cánh",
  "điều hòa cây", "máy nước nóng gas", "máy nước nóng NLMT", "máy sấy quần áo",
  "robot hút bụi lau nhà", "máy hút bụi cầm tay", "bàn ủi hơi nước", "máy may gia đình",
];
addPrefixed("Cửa hàng", DIEN_MAY);
addPrefixed("Sửa", ["máy lạnh tại nhà", "máy giặt tại nhà", "tủ lạnh tại nhà", "TV OLED", "âm thanh karaoke", "loa tháp"]);

// sports
const SPORT = [
  "giày chạy Nike", "giày bóng đá", "giày cầu lông", "giày tennis", "giày pickleball",
  "vợt cầu lông Yonex", "vợt tennis", "gậy golf", "bóng rổ Spalding", "bóng đá size 5",
  "xe đạp road", "xe đạp MTB", "xe đạp folding", "xe đạp trẻ em",
  "dụng cụ tập gym tại nhà", "tạ tay", "thảm yoga", "dây kháng lực", "xa đạp tập",
  "lều camping 4 người", "túi ngủ", "bếp gas du lịch", "balo leo núi", "gậy leo núi",
];
addPrefixed("Cửa hàng", SPORT);
addPrefixed("Sân", ["bóng đá 5 người", "bóng đá 7 người", "tennis sân cứng", "pickleball trong nhà", "cầu lông gỗ", "bóng rổ"]);
addPrefixed("CLB", ["chạy bộ 5K", "đạp xe cuối tuần", "yoga doanh nghiệp", "gym hội viên", "võ thuật trẻ em"]);

// life services
const DOI_SONG = [
  "giúp việc theo giờ", "giúp việc ăn ở", "bảo mẫu trẻ em", "chăm sóc người bệnh",
  "nấu cơm gia đình", "dọn nhà theo ca", "giặt thảm", "giặt rèm", "giặt sofa",
  "vệ sinh kính cao tầng", "vệ sinh nhà sau xây", "thông tắc bồn cầu", "sửa ống nước",
  "sửa điện dân dụng", "lắp quạt trần", "lắp đèn LED", "làm chìa khóa từ",
  "sửa khóa cửa", "lắp camera nhà", "lắp khóa vân tay", "dệt lưới chống muỗi",
  "phun thuốc muỗi", "diệt gián", "diệt chuột", "diệt mối",
];
addPrefixed("Dịch vụ", DOI_SONG);

// hotels / F&B support
addPrefixed("Cung cấp", [
  "suất ăn công nghiệp", "suất ăn trường học", "rau củ bếp nhà hàng", "thịt heo sạch bếp",
  "hải sản tươi nhà hàng", "đá viên quán nhậu", "gas nhà hàng", "bột làm bánh",
  "topping trà sữa", "ly nhựa PET", "ống hút giấy", "hộp cơm bã mía",
  "khẩu trang y tế", "găng tay nitrile", "đồng phục bếp", " tạp dề nhà hàng",
]);

// region-flavored local SMEs (still ngành, not pure geo KW)
const TINH = [
  "Hà Nội", "Hải Phòng", "Quảng Ninh", "Nam Định", "Thanh Hóa", "Nghệ An", "Huế",
  "Đà Nẵng", "Quảng Nam", "Quy Nhơn", "Nha Trang", "Đà Lạt", "Buôn Ma Thuột",
  "TP.HCM", "Bình Dương", "Đồng Nai", "Cần Thơ", "Cà Mau", "Phú Quốc", "Vũng Tàu",
];
const DICH_VU_DIA_PHUONG = [
  "giặt sấy", "sửa xe máy", "rửa xe", "cắt tóc nam", "nail", "spa", "nha khoa",
  "phòng khám", "gia sư", "chuyển nhà", "vệ sinh máy lạnh", "ship đồ ăn",
  "cơm văn phòng", "trà sữa", "cà phê takeaway", "hoa tươi", "bánh sinh nhật",
];
for (const dv of DICH_VU_DIA_PHUONG) {
  for (const t of TINH) {
    add(`${dv.charAt(0).toUpperCase() + dv.slice(1)} ${t}`, slugify(`${dv}-${t}`));
  }
}

// wholesale / đại lý brands-ish generic
const NGANH_DAI_LY = [
  "sữa bột", "tã bỉm", "mỹ phẩm chính hãng", "thực phẩm chức năng", "vitamin",
  "thiết bị nhà bếp", "đồ gia dụng Nhật", "đồ gia dụng Hàn", "đèn trang trí",
  "nội thất gỗ", "nệm", "gối", "chăn ga gối đệm", "rèm cửa",
  "sàn gỗ", "giấy dán tường", "sơn Jotun", "keo Apollo", "ổn áp Lioa",
  "máy lọc nước Karofi", "camera Yoosee", "khóa cửa điện tử", "cảm biến báo cháy",
  "thiết bị PCCC", "van nước", "ống nước nóng", "sen cây", "lavabo",
  "bồn cầu thông minh", "bếp gas", "hút mùi", "quạt hút công nghiệp",
  "máy phát điện", "ắc quy xe máy", "nhớt xe", "lốp xe máy", "phụ tùng Honda",
  "phụ tùng Toyota", "phụ tùng Hyundai", "phụ tùng Ford", "đồ chơi trẻ em",
  "sách giáo khoa", "văn phòng phẩm", "mực in", "giấy A4", "máy in laser",
];
addPrefixed("Đại lý", NGANH_DAI_LY);
addPrefixed("Nhà phân phối", ["nước giải khát", "bia", "rượu vang", "thực phẩm đông lạnh", "hải sản đông lạnh", "thịt đông lạnh", "rau củ đông lạnh"]);

// manufacturing niche
const SAN_XUAT = [
  "nến thơm", "xà phòng handmade", "nước hoa handmade", "túi canvas", "ví da may tay",
  "giày vải", "thảm trang trí", "gối thêu", "áo thun local brand", "hoodie streetwear",
  "mũ bucket in", "sticker vinyl", "móc khóa mica", "lắc tay resin", "tranh epoxy",
  "kệ gỗ treo tường", "bàn trà gỗ", "ghế gỗ thông", "đèn gỗ decor", "chậu gốm",
  "ly sứ in hình", "áo mưa PVC", "tạp dề canvas", "túi đựng laptop", "ốp lưng in UV",
];
addPrefixed("Xưởng sản xuất", SAN_XUAT);

// online / ecom niches
const ECOM = [
  "thời trang nữ Shopee", "mỹ phẩm TikTok Shop", "đồ chơi Lazada", "phụ kiện điện thoại",
  "đồ gia dụng online", "thực phẩm sạch online", "đặc sản vùng miền online", "sách cũ online",
  "đồ secondhand", "đồ vintage", "giày sneaker auth check", "túi hàng hiệu preloved",
  "dropshipping Mỹ", "dropshipping Trung", "affiliate Shopee", "KOL shop",
];
addPrefixed("Shop online", ECOM);

// health supplements / wellness
addPrefixed("Shop", [
  "đông trùng hạ thảo", "nhân sâm Hàn Quốc", "yến sào Khánh Hòa", "collagen Nhật",
  "vitamin D3", "omega 3", "probiotic", "enzyme tiêu hóa", "trà giảm cân",
  "bột detox", "nước uống collagen", "kẹo dẻo vitamin", "dầu cá", "tảo xoắn",
]);

// events
addPrefixed("Dịch vụ", [
  "tổ chức sinh nhật", "tổ chức thôi nôi", "tổ chức đám hỏi", "tổ chức lễ đính hôn",
  "tổ chức kỷ niệm ngày cưới", "tổ chức year-end party", "tổ chức khai trương",
  "tổ chức hội thảo", "tổ chức team building trong nhà", "tổ chức gala dinner",
  "cho thuê MC", "cho thuê ban nhạc", "cho thuê ca sĩ", "cho thuê DJ",
  "cho thuê ánh sáng sân khấu", "cho thuê âm thanh", "cho thuê màn LED", "cho thuê backdrop",
]);

// fillers — product retail only (natural labels)
const HANG_BAN = [
  "camera hành trình", "định vị GPS", "bộ đàm", "pin lithium", "sạc dự phòng",
  "máy chiếu", "bảng tương tác", "máy photocopy màu", "máy fax", "router wifi 6",
  "switch mạng", "cáp quang", "ống luồn điện", "máng cáp", "tủ rack",
  "UPS online", "ổ cứng NAS", "máy chủ mini", "thẻ nhớ", "film bảo vệ màn hình",
  "kính cường lực điện thoại", "cáp sạc nhanh", "dock sạc", "bàn standing desk",
  "ghế công thái học", "kệ hồ sơ", "tủ tài liệu", "máy hủy giấy", "máy đếm tiền",
  "két sắt", "báo động cửa", "chuông cửa wifi", "máy tạo ẩm", "máy hút ẩm",
  "quạt trần công nghiệp", "đèn sưởi nhà tắm", "vòi sen tăng áp", "vòi nóng lạnh",
  "bồn tắm nằm", "cabin xông hơi", "máy xông mặt", "máy sấy tóc chuyên nghiệp",
  "máy uốn tóc", "máy duỗi tóc", "ghế cắt tóc", "gương salon", "giường spa",
  "máy đá nóng spa", "máy hàn mi", "máy phun xăm", "máy laser spa",
  "máy đo SpO2", "máy xông mũi họng", "xe lăn điện", "nạng chỉnh hình",
  "máy chạy bộ", "xe đạp tập", "ghế massage", "đai massage", "vợt pickleball",
  "giày leo núi", "túi trống gym", "băng boxing", "găng boxing", "thức ăn cá koi",
  "cát thủy sinh", "máy sủi oxy", "đèn LED hồ cá", "cây thủy sinh", "cát vệ sinh mèo",
  "bát ăn chậm chó", "vòng chống rận", "chuồng chó inox", "balo đựng mèo",
  "phân hữu cơ viên", "đất sạch trồng rau", "chậu nhựa trồng cây", "béc tưới nhỏ giọt",
  "máy cắt cỏ", "máy xịt thuốc", "máy xới đất", "máy gặt lúa", "máy xay thịt",
  "máy hút chân không", "máy dán nhãn", "máy ép dầu", "máy rang cà phê", "máy xay cà phê",
  "máy pha trà sữa", "máy làm đá viên", "tủ trưng bày bánh", "quầy thu ngân", "kệ siêu thị",
  "thùng đá inox", "nồi soup công nghiệp", "bếp gas công nghiệp", "lò nướng bánh công nghiệp",
  "máy trộn bột", "máy cán bột", "máy thái thịt", "máy ép trái cây công nghiệp", "máy làm kem",
  "máy may công nghiệp", "máy thêu vi tính", "máy cắt vải", "máy ép nhiệt", "máy in UV",
  "máy in DTF", "máy ép chuyển nhiệt", "máy cắt decal", "máy in tem nhãn",
  "ván nhựa PVC", "tấm alu", "tấm polycarbonate", "kính low-e", "gỗ công nghiệp MDF",
  "keo dán gạch", "keo silicone", "băng keo công nghiệp", "màng PE bảo vệ", "foam cách nhiệt",
];
for (const n of HANG_BAN) {
  add(`Cửa hàng ${n}`, slugify(`cua-hang-${n}`));
  add(`Đại lý ${n}`, slugify(`dai-ly-${n}`));
  add(`Shop ${n}`, slugify(`shop-${n}`));
}

// service compounds — verb × thiết bị
const VERBS = ["Sửa chữa", "Bảo trì", "Lắp đặt", "Cho thuê", "Vệ sinh"];
const OBJECTS = [
  "máy photocopy", "máy in laser", "máy fax", "máy chiếu", "điều hòa multi",
  "thang máy tải hàng", "cổng tự động", "barrier giữ xe", "camera AI", "hệ thống báo cháy",
  "hệ thống mạng LAN", "tổng đài IP", "máy chấm công khuôn mặt", "khóa cửa khách sạn",
  "máy POS", "máy in bill", "cân điện tử", "két sắt điện tử", "máy lọc nước công nghiệp",
  "máy nén khí", "máy phát điện dầu", "máy hàn TIG", "xe nâng tay", "xe đẩy hàng",
  "băng tải", "máy đóng đai", "máy quấn màng", "máy lạnh âm trần", "hệ thống VRV",
  "chiller làm lạnh", "tháp giải nhiệt", "bơm nước tăng áp", "hệ thống PCCC",
  "bình chữa cháy", "đầu báo khói", "đèn exit", "loa thông báo", "âm thanh hội trường",
  "màn hình LED P3", "màn hình LED P2", "kiosk thông tin", "máy lấy số thứ tự",
  "máy lọc không khí", "robot hút bụi công nghiệp", "máy chà sàn", "máy hút bụi công nghiệp",
  "máy sấy công nghiệp", "máy giặt công nghiệp", "nồi hơi", "lò hơi", "máy phát điện",
];
for (const v of VERBS) {
  for (const o of OBJECTS) add(`${v} ${o}`, slugify(`${v}-${o}`));
}

// thêm ngành dịch vụ chuyên biệt (đủ 2000)
const THEM = [
  "Công ty vệ sinh công nghiệp", "Công ty chuyển kho xưởng", "Công ty phá dỡ công trình",
  "Công ty khoan cắt bê tông", "Công ty chống mối mọt", "Công ty giặt thảm công nghiệp",
  "Công ty cung ứng lao động thời vụ", "Công ty outsourcing kế toán", "Công ty bảo trì tòa nhà",
  "Văn phòng thám tử tư", "Văn phòng dịch thuật công chứng", "Văn phòng đại diện thương mại",
  "Trung tâm ngoại ngữ doanh nghiệp", "Trung tâm đào tạo barista", "Trung tâm đào tạo bartender",
  "Trung tâm đào tạo kỹ thuật viên nail", "Trung tâm đào tạo thợ tóc", "Trung tâm đào tạo spa",
  "Học viện pha chế", "Học viện thẩm mỹ", "Học viện kỹ năng mềm", "Học viện bán hàng",
  "Studio podcast thuê giờ", "Studio livestream sản phẩm", "Studio xanh greenscreen",
  "Nhà máy nước đá", "Nhà máy nước đóng chai", "Nhà máy nước khoáng", "Nhà máy nước mắm",
  "Nhà máy bột ngọt", "Nhà máy dầu ăn", "Nhà máy mì gói", "Nhà máy bánh kẹo",
  "Xưởng đông lạnh thủy sản", "Xưởng sơ chế rau củ", "Xưởng đóng gói trái cây xuất khẩu",
  "Kho ngoại quan", "Kho CFS", "Kho bonded", "Cảng nội địa ICD", "Depo container",
  "Đại lý hãng tàu", "Đại lý hãng hàng không cargo", "Công ty freight forwarding",
  "Công ty customs brokerage", "Công ty kiểm định hàng hóa", "Công ty giám định bảo hiểm",
  "Cửa hàng vật tư ngành điện lạnh", "Cửa hàng vật tư ngành nước", "Cửa hàng vật tư ngành điện",
  "Cửa hàng vật tư ngành PCCC", "Cửa hàng vật tư ngành cơ khí", "Cửa hàng vật tư ngành hàn",
  "Siêu thị mini", "Cửa hàng tiện lợi", "Cửa hàng tạp hóa online", "Cửa hàng mẹ và bé",
  "Cửa hàng đồ chơi giáo dục", "Cửa hàng sách thiếu nhi", "Cửa hàng văn phòng phẩm online",
  "Tiệm cầm đồ điện thoại", "Tiệm cầm đồ xe máy", "Tiệm đổi thưởng", "Tiệm game thùng",
  "Quán net PC bang", "Quán PS5 thuê máy", "Quán billiards VIP", "Quán dart",
  "Phòng tập dance studio", "Phòng tập aerial yoga", "Phòng tập boxing", "Sân tập golf 3D",
  "Trung tâm chăm sóc sắc đẹp Hàn Quốc", "Trung tâm thẩm mỹ Nhật Bản", "Trung tâm chăm sóc móng cao cấp",
  "Clinic nha khoa Hàn", "Clinic da liễu chuẩn Hàn", "Clinic tiêm meso", "Clinic trẻ hóa Thermage",
];
for (const label of THEM) add(label, slugify(label));

// tổ chức theo ngành hàng đông lạnh / khô
const THUC_PHAM_DL = [
  "tôm đông lạnh", "cá basa phi lê", "muc ống đông lạnh", "cua đồng đông lạnh",
  "thịt bò úc đông lạnh", "thịt heo đông lạnh", "gà công nghiệp đông lạnh", "khoai tây đông lạnh",
  "rau củ đông lạnh", "trái cây đông lạnh", "kem cây", "kem hộp", "bánh bao đông lạnh",
  "há cảo đông lạnh", "pizza đông lạnh", "chả cá đông lạnh", "nem chua đông lạnh",
];
addPrefixed("Kho / phân phối", THUC_PHAM_DL);
addPrefixed("Xuất khẩu", ["hạt điều", "hồ tiêu", "cà phê nhân", "gạo thơm", "thủy sản", "đồ gỗ nội thất", "may mặc", "giày da", "túi xách", "nông sản tươi"]);
addPrefixed("Nhập khẩu", ["máy móc công nghiệp", "linh kiện điện tử", "mỹ phẩm", "thực phẩm chức năng", "rượu vang", "ô tô nguyên chiếc", "phụ tùng ô tô", "vải nguyên liệu", "hóa chất công nghiệp", "nhựa nguyên sinh"]);

// nghề tự do / chuyên môn
const CHUYEN_MON = [
  "Kiến trúc sư độc lập", "Kỹ sư kết cấu", "Kỹ sư điện công trình", "Kỹ sư MEP",
  "Họa viên Autocad", "Họa viên 3Ds Max", "Designer UI freelance", "Designer bao bì freelance",
  "Copywriter freelance", "Biên tập viên nội dung", "Dịch giả kỹ thuật", "Phiên dịch viên hội nghị",
  "Nhiếp ảnh gia sự kiện", "Quay phim phóng sự", "Editor video YouTube", "Motion designer",
  "Luật sư tư vấn hợp đồng", "Luật sư sở hữu trí tuệ", "Công chứng viên", "Thừa phát lại độc lập",
  "Kế toán trưởng dịch vụ", "Kiểm toán viên độc lập", "Tư vấn thuế độc lập", "Định giá viên BĐS",
  "Môi giới bảo hiểm độc lập", "Chuyên viên thẩm định vay", "Cố vấn tài chính cá nhân",
  "HLV gym online", "HLV pilates online", "Chuyên gia dinh dưỡng online", "Bác sĩ tư vấn telehealth",
];
for (const label of CHUYEN_MON) add(label, slugify(label));

// fran chise / chuỗi
const FRANCHISE = [
  "Nhượng quyền trà sữa", "Nhượng quyền cà phê", "Nhượng quyền bánh mì", "Nhượng quyền phở",
  "Nhượng quyền giặt sấy", "Nhượng quyền cắt tóc", "Nhượng quyền nail", "Nhượng quyền phòng gym",
  "Nhượng quyền giáo dục STEM", "Nhượng quyền anh ngữ", "Nhượng quyền nhà thuốc", "Nhượng quyền tiện lợi",
];
for (const label of FRANCHISE) add(label, slugify(label));

if (niches.length < 2000) {
  console.error(`Only ${niches.length} niches — need more banks`);
  process.exit(1);
}

const final = niches.slice(0, 2000);
const outMd = path.join(root, "tmp-programmatic", "nganh-nghe-2000-batch3.md");
const outJson = path.join(root, "tmp-programmatic", "nganh-nghe-2000-batch3.json");

const lines = [
  "# 2000 ngành nghề mới (batch 3)",
  "",
  `- Generated: ${new Date().toISOString()}`,
  `- Tổng: **${final.length}** ngành`,
  "- Không trùng ~1500 slug batch trước",
  "- Dạng KW: **thiết kế website [ngành]** — `thiet-ke-website-{slug}`",
  "",
];

const sectionSize = 100;
for (let i = 0; i < final.length; i++) {
  if (i % sectionSize === 0) {
    lines.push(`## ${i + 1}–${Math.min(i + sectionSize, final.length)}`);
    lines.push("");
  }
  const n = final[i];
  lines.push(`${i + 1}. ${n.label} — \`${n.slug}\``);
}
lines.push("");

fs.writeFileSync(outMd, lines.join("\n"), "utf8");
fs.writeFileSync(
  outJson,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      total: final.length,
      niches: final.map((n, i) => ({
        n: i + 1,
        label: n.label,
        slug: n.slug,
        kw: `thiết kế website ${n.label.toLowerCase()}`,
        blogSlug: `thiet-ke-website-${n.slug}`,
      })),
    },
    null,
    2,
  ),
  "utf8",
);

console.log(`Total generated before slice: ${niches.length}`);
console.log(`Written: ${final.length}`);
console.log(outMd);
console.log(`JSON: ${outJson}`);
