"use client";

import { useAdmin, type ProjectItem, type TestimonialItem } from "@/lib/AdminContext";
import { uploadMediaFile } from "@/lib/client-media-upload";
import { useState } from "react";

export function ProjectsManagementPanel() {
  const { settings, addProject, updateProject, removeProject } = useAdmin();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: "",
    beforeMetric: "",
    beforeMetricLabel: "",
    afterMetric: "",
    afterMetricLabel: "",
  });
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const selectedPlatform = "home";
  const projects = settings.media[selectedPlatform]?.projects || [];

  const handleReset = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      thumbnail: "",
      beforeMetric: "",
      beforeMetricLabel: "",
      afterMetric: "",
      afterMetricLabel: "",
    });
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingId(project.id);
    setFormData({
      name: project.name,
      description: project.description,
      thumbnail: project.thumbnail,
      beforeMetric: project.beforeMetric,
      beforeMetricLabel: project.beforeMetricLabel,
      afterMetric: project.afterMetric,
      afterMetricLabel: project.afterMetricLabel,
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Nhập tên dự án");
      return;
    }
    if (editingId) {
      updateProject(selectedPlatform, editingId, formData);
    } else {
      addProject(selectedPlatform, formData as Omit<ProjectItem, "id">);
    }
    handleReset();
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProgress(1);
    setUploadError(null);
    try {
      const uploaded = await uploadMediaFile(file, {
        title: "Dự án tiêu biểu",
        sectionLabel: "projects",
        suggestedName: formData.name || "project",
      });
      setFormData((prev) => ({ ...prev, thumbnail: uploaded.url }));
      setUploadingProgress(0);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      setUploadError(errorMsg);
      setUploadingProgress(0);
    }
    e.currentTarget.value = "";
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
      <div>
        <h3 className="font-bold text-white mb-2">Dự Án Tiêu Biểu</h3>
        <p className="text-sm text-white/60">Quản lý các dự án tiêu biểu</p>
      </div>

      {/* Form */}
      <div className="space-y-3 p-4 rounded-lg border border-white/10 bg-white/5">
        <input
          type="text"
          placeholder="Tên dự án"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50"
        />
        <textarea
          placeholder="Mô tả dự án"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Chỉ số trước (VD: +150%)"
            value={formData.beforeMetric}
            onChange={(e) => setFormData((prev) => ({ ...prev, beforeMetric: e.target.value }))}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50"
          />
          <input
            type="text"
            placeholder="Nhãn (VD: Tăng doanh thu)"
            value={formData.beforeMetricLabel}
            onChange={(e) => setFormData((prev) => ({ ...prev, beforeMetricLabel: e.target.value }))}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Chỉ số sau (VD: +200%)"
            value={formData.afterMetric}
            onChange={(e) => setFormData((prev) => ({ ...prev, afterMetric: e.target.value }))}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50"
          />
          <input
            type="text"
            placeholder="Nhãn (VD: Lượt truy cập)"
            value={formData.afterMetricLabel}
            onChange={(e) => setFormData((prev) => ({ ...prev, afterMetricLabel: e.target.value }))}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50"
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-white/70">Hình đại diện</label>
          <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 transition block text-center disabled:cursor-not-allowed disabled:opacity-50" style={{ opacity: uploadingProgress > 0 ? 0.6 : 1, pointerEvents: uploadingProgress > 0 ? 'none' : 'auto' }}>
            {uploadingProgress > 0 ? `Đang tải... (${uploadingProgress}%)` : 'Chọn ảnh'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingProgress > 0}
              onChange={handleThumbnailUpload}
            />
          </label>
          {uploadError && (
            <p className="text-xs text-red-300">{uploadError}</p>
          )}
          {formData.thumbnail && (
            <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-video max-w-xs">
              <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, thumbnail: "" }))}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
              >
                Xóa
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition"
          >
            {editingId ? "Cập nhật" : "Thêm"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20 transition"
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project.id} className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-white">{project.name}</p>
                  <p className="text-xs text-white/60">{project.description}</p>
                </div>
                {project.thumbnail && (
                  <img src={project.thumbnail} alt={project.name} className="w-12 h-12 rounded object-cover" />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(project)}
                  className="flex-1 rounded px-2 py-1 text-xs bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => removeProject(selectedPlatform, project.id)}
                  className="flex-1 rounded px-2 py-1 text-xs bg-red-600/20 text-red-300 hover:bg-red-600/30 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TestimonialsManagementPanel() {
  const { settings, addTestimonial, updateTestimonial, removeTestimonial } = useAdmin();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerLogo: "",
    feedbackImage: "",
    rating: 5,
  });
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [feedbackUploadProgress, setFeedbackUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const selectedPlatform = "home";
  const testimonials = settings.media[selectedPlatform]?.testimonials || [];

  const handleReset = () => {
    setEditingId(null);
    setFormData({
      customerName: "",
      customerLogo: "",
      feedbackImage: "",
      rating: 5,
    });
  };

  const handleEdit = (testimonial: TestimonialItem) => {
    setEditingId(testimonial.id);
    setFormData({
      customerName: testimonial.customerName,
      customerLogo: testimonial.customerLogo,
      feedbackImage: testimonial.feedbackImage,
      rating: testimonial.rating,
    });
  };

  const handleSave = () => {
    if (!formData.customerName.trim()) {
      alert("Nhập tên khách hàng");
      return;
    }
    if (!formData.feedbackImage.trim()) {
      alert("Chọn ảnh feedback");
      return;
    }
    if (editingId) {
      updateTestimonial(selectedPlatform, editingId, formData);
    } else {
      addTestimonial(selectedPlatform, formData as Omit<TestimonialItem, "id">);
    }
    handleReset();
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploadProgress(1);
    setUploadError(null);
    try {
      const uploaded = await uploadMediaFile(file, {
        title: "Khách hàng nói gì",
        sectionLabel: "testimonials-logo",
        suggestedName: formData.customerName || "customer-logo",
      });
      setFormData((prev) => ({ ...prev, customerLogo: uploaded.url }));
      setLogoUploadProgress(0);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      setUploadError(errorMsg);
      setLogoUploadProgress(0);
    }
    e.currentTarget.value = "";
  };

  const handleFeedbackUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFeedbackUploadProgress(1);
    setUploadError(null);
    try {
      const uploaded = await uploadMediaFile(file, {
        title: "Khách hàng nói gì",
        sectionLabel: "testimonials-feedback",
        suggestedName: formData.customerName || "feedback-image",
      });
      setFormData((prev) => ({ ...prev, feedbackImage: uploaded.url }));
      setFeedbackUploadProgress(0);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Lỗi không xác định';
      setUploadError(errorMsg);
      setFeedbackUploadProgress(0);
    }
    e.currentTarget.value = "";
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-6">
      <div>
        <h3 className="font-bold text-white mb-2">Khách Hàng Nói Gì</h3>
        <p className="text-sm text-white/60">Quản lý feedback khách hàng (logo, tên, ảnh feedback)</p>
      </div>

      {/* Form */}
      <div className="space-y-3 p-4 rounded-lg border border-white/10 bg-white/5">
        <input
          type="text"
          placeholder="Tên khách hàng"
          value={formData.customerName}
          onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50"
        />

        {/* Logo Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-white/70">Logo khách hàng</label>
          <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 transition block text-center disabled:cursor-not-allowed disabled:opacity-50" style={{ opacity: logoUploadProgress > 0 ? 0.6 : 1, pointerEvents: logoUploadProgress > 0 ? 'none' : 'auto' }}>
            {logoUploadProgress > 0 ? `Đang tải... (${logoUploadProgress}%)` : 'Chọn logo'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={logoUploadProgress > 0}
              onChange={handleLogoUpload}
            />
          </label>
          {formData.customerLogo && (
            <div className="relative rounded-lg overflow-hidden border border-white/10 max-w-xs">
              <img src={formData.customerLogo} alt="Logo" className="w-full h-16 object-contain" />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, customerLogo: "" }))}
                className="absolute top-1 right-1 bg-red-600 text-white px-2 py-0.5 rounded text-xs"
              >
                Xóa
              </button>
            </div>
          )}
        </div>

        {/* Feedback Image Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-white/70">Ảnh feedback (hiển thị nội dung review)</label>
          <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 transition block text-center disabled:cursor-not-allowed disabled:opacity-50" style={{ opacity: feedbackUploadProgress > 0 ? 0.6 : 1, pointerEvents: feedbackUploadProgress > 0 ? 'none' : 'auto' }}>
            {feedbackUploadProgress > 0 ? `Đang tải... (${feedbackUploadProgress}%)` : 'Chọn ảnh feedback'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={feedbackUploadProgress > 0}
              onChange={handleFeedbackUpload}
            />
          </label>
          {uploadError && (
            <p className="text-xs text-red-300">{uploadError}</p>
          )}
          {formData.feedbackImage && (
            <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-video max-w-xs">
              <img src={formData.feedbackImage} alt="Feedback" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, feedbackImage: "" }))}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
              >
                Xóa
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-white/70">Đánh giá (sao)</label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData((prev) => ({ ...prev, rating: parseInt(e.target.value) }))}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} sao</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition"
          >
            {editingId ? "Cập nhật" : "Thêm"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20 transition"
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      {/* Testimonials List */}
      {testimonials.length > 0 && (
        <div className="space-y-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-white flex items-center gap-2">
                    {testimonial.customerLogo && (
                      <img src={testimonial.customerLogo} alt="Logo" className="w-6 h-6 object-contain" />
                    )}
                    {testimonial.customerName}
                  </p>
                  <p className="text-xs text-yellow-400">{"⭐".repeat(testimonial.rating)}</p>
                </div>
                {testimonial.feedbackImage && (
                  <img src={testimonial.feedbackImage} alt="Feedback" className="w-12 h-12 rounded object-cover" />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(testimonial)}
                  className="flex-1 rounded px-2 py-1 text-xs bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => removeTestimonial(selectedPlatform, testimonial.id)}
                  className="flex-1 rounded px-2 py-1 text-xs bg-red-600/20 text-red-300 hover:bg-red-600/30 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
