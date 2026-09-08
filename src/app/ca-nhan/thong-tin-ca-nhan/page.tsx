"use client";

import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import { useQueryProfile, useUpdateProfileMutation } from "@/hooks/useProfile";
import { authClient } from "@/lib/auth-client";
import { formatBirthday } from "@/utils/formatBirthday";
import { useState } from "react";

interface Profile {
  name: string | null;
  email: string;
  gender: "Nam" | "Nữ" | "Khác" | null;
  birthday: string | null;
}

export default function ProfilePage() {
  const { data: profile, isPending: isPendingQuery } = useQueryProfile();
  const { mutate, isPending: isPendingUpdate } = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<Profile>(profile);

  const handleEdit = () => {
    setForm(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(profile);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    const { email, ...prodileDataUpdate } = form;

    mutate(prodileDataUpdate);
  };
  if (isPendingQuery) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="mx-auto w-full rounded-xl bg-white">
      {/* Header */}
      <div className="border-b border-[#e1e5ea] px-5 py-4 md:px-5">
        <h1 className="text-[20px] font-semibold text-[#111827]">
          Thông tin cá nhân
        </h1>
      </div>

      {/* Content */}
      <div className="flex justify-center px-5 py-6 md:px-10">
        <div className="w-full max-w-[510]">
          {/* Avatar */}
          <div className="mb-8 flex justify-center">
            <Avatar />
          </div>

          {!isEditing ? (
            <ProfileView profile={profile} onEdit={handleEdit} />
          ) : (
            <ProfileForm
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function Avatar() {
  return (
    <div className="relative h-[114px] w-[114px] overflow-hidden rounded-full">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2f78ff] to-[#73a5ff]" />

      {/* Decorative stars */}
      <span className="absolute left-[13px] top-[48px] text-white/50 text-xl">
        ✦
      </span>

      <span className="absolute right-[16px] top-[28px] text-white/50 text-lg">
        ✦
      </span>

      <span className="absolute right-[14px] top-[58px] text-white/50 text-xl">
        ✦
      </span>

      {/* Head */}
      <div className="absolute left-1/2 top-[22px] h-[44px] w-[44px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#dce8ff] to-[#a5c3ff] shadow-inner" />

      {/* Body */}
      <div className="absolute bottom-[-18px] left-1/2 h-[67px] w-[86px] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#dce8ff] to-[#a5c3ff]" />
    </div>
  );
}

/* =========================================================
   VIEW MODE
========================================================= */

interface ProfileViewProps {
  profile: Profile;
  onEdit: () => void;
}

function ProfileView({ profile, onEdit }: ProfileViewProps) {
  return (
    <>
      <div className="space-y-0">
        <InfoRow label="Họ và tên" value={profile.name ?? "Anonymous"} />

        <InfoRow label="Email" value={profile.email} />

        <InfoRow
          label="Giới tính"
          value={
            profile.gender === "Nam"
              ? "Nam"
              : profile.gender === "Nữ"
                ? "Nữ"
                : profile.gender === "Khác"
                  ? "Khác"
                  : "Thêm thông tin"
          }
          valueClassName={profile.gender ? "text-[#111827]" : "text-[#165DFF]"}
        />

        <InfoRow
          label="Ngày sinh"
          value={
            profile.birthday
              ? formatBirthday(profile.birthday)
              : "Thêm thông tin"
          }
          valueClassName={
            profile.birthday ? "text-[#111827]" : "text-[#165DFF]"
          }
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onEdit}
          className="
            rounded-full
            bg-[#eef2ff]
            px-8
            py-3
            text-[17px]
            font-medium
            text-[#1557e8]
            transition
            hover:bg-[#e3e9ff]
          "
        >
          Chỉnh sửa thông tin
        </button>
      </div>
    </>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

interface InfoRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function InfoRow({
  label,
  value,
  valueClassName = "text-[#111827]",
}: InfoRowProps) {
  return (
    <div className="flex min-h-[66px] items-center justify-between border-b border-[#e1e5ea]">
      <span className="text-[17px] text-[#3b5d8b]">{label}</span>

      <span className={`text-right text-[17px] font-medium ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   EDIT FORM
========================================================= */

interface ProfileFormProps {
  form: Profile;
  setForm: React.Dispatch<React.SetStateAction<Profile>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

function ProfileForm({ form, setForm, onSubmit, onCancel }: ProfileFormProps) {
  return (
    <form onSubmit={onSubmit}>
      {/* Name */}
      <div className="mb-5">
        <div className="relative">
          <input
            type="text"
            value={form.name ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder=" "
            className="
              peer
              h-[70]
              w-full
              rounded-[10px]
              border
              border-[#bdc7d5]
              px-5
              pt-6
              text-[18px]
              text-[#111827]
              outline-none
              transition
              focus:border-[#2563eb]
              focus:ring-1
              focus:ring-[#2563eb]
            "
          />

          <label
            className="
              pointer-events-none
              absolute
              left-5
              top-2
              text-[14px]
              text-[#60738e]
              transition-all
              peer-placeholder-shown:top-[20]
              peer-placeholder-shown:text-[17px]
              peer-focus:top-2
              peer-focus:text-[14px]
            "
          >
            Họ và tên
          </label>
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <div className="relative">
          <input
            type="text"
            value={form.email}
            disabled
            className="
              h-[70]
              w-full
              rounded-[10px]
              border
              border-transparent
              bg-[#e5e9ef]
              px-5
              pt-6
              text-[18px]
              text-[#5d7595]
              outline-none
              cursor-not-allowed
            "
          />

          <span className="absolute left-5 top-2 text-[14px] text-[#60738e]">
            Email
          </span>
        </div>
      </div>

      {/* Gender */}
      <div className="mb-5">
        <p className="mb-3 text-[17px] text-[#374151]">Giới tính</p>

        <div className="flex gap-20">
          <GenderOption
            label="Nam"
            value="Nam"
            checked={form.gender === "Nam"}
            onChange={() =>
              setForm((prev) => ({
                ...prev,
                gender: "Nam",
              }))
            }
          />

          <GenderOption
            label="Nữ"
            value="Nữ"
            checked={form.gender === "Nữ"}
            onChange={() =>
              setForm((prev) => ({
                ...prev,
                gender: "Nữ",
              }))
            }
          />

          <GenderOption
            label="Khác"
            value="Khác"
            checked={form.gender === "Khác"}
            onChange={() =>
              setForm((prev) => ({
                ...prev,
                gender: "Khác",
              }))
            }
          />
        </div>
      </div>

      {/* Birthday */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="date"
            value={form.birthday ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                birthday: e.target.value,
              }))
            }
            className="
              h-[50px]
              w-full
              rounded-[8px]
              border
              border-[#d4d8de]
              bg-white
              px-4
              text-[17px]
              text-[#111827]
              outline-none
              focus:border-[#2563eb]
              focus:ring-1
              focus:ring-[#2563eb]
            "
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-full
            bg-[#eef2ff]
            px-7
            py-3
            text-[17px]
            font-medium
            text-[#1557e8]
            transition
            hover:bg-[#e3e9ff]
          "
        >
          Hủy
        </button>

        <button
          type="submit"
          className="
            rounded-full
            bg-[#2868e8]
            px-8
            py-3
            text-[17px]
            font-semibold
            text-white
            transition
            hover:bg-[#1f5ad0]
          "
        >
          Cập nhật thông tin
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   GENDER
========================================================= */

interface GenderOptionProps {
  label: string;
  value: "Nam" | "Nữ" | "Khác";
  checked: boolean;
  onChange: () => void;
}

function GenderOption({ label, checked, onChange }: GenderOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        onClick={onChange}
        className={`
          flex
          h-[25px]
          w-[25px]
          items-center
          justify-center
          rounded-full
          border
          ${checked ? "border-[#2563eb]" : "border-[#7a8799]"}
        `}
      >
        {checked && (
          <span className="h-[13px] w-[13px] rounded-full bg-[#2563eb]" />
        )}
      </button>

      <span className="text-[16px] text-[#111827]">{label}</span>
    </label>
  );
}
