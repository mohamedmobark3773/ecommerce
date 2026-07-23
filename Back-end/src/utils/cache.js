// ==========================================================
// src/utils/cache.js
// Utility للتعامل مع Redis Cache
// ==========================================================

// استيراد عميل Redis
import redisClient from "../config/redis.js";


// ==========================================================
// حفظ بيانات داخل الـ Cache
// ==========================================================

export const setCache = async (key, value, ttl = 3600) => {

    try {

        // تحويل البيانات إلى JSON
        const data = JSON.stringify(value);

        // حفظ البيانات مع مدة انتهاء
        await redisClient.set(key, data, {
            EX: ttl
        });

    } catch (error) {

        console.error("Cache Set Error:", error);

    }

};


// ==========================================================
// قراءة بيانات من الـ Cache
// ==========================================================

export const getCache = async (key) => {

    try {

        // جلب البيانات
        const data = await redisClient.get(key);

        // إذا لم توجد بيانات
        if (!data) {
            return null;
        }

        // تحويل JSON إلى Object
        return JSON.parse(data);

    } catch (error) {

        console.error("Cache Get Error:", error);

        return null;

    }

};


// ==========================================================
// حذف مفتاح واحد
// ==========================================================

export const deleteCache = async (key) => {

    try {

        await redisClient.del(key);

    } catch (error) {

        console.error("Cache Delete Error:", error);

    }

};


// ==========================================================
// حذف جميع المفاتيح المطابقة لـ Pattern
// مثال:
// user:*
// product:*
// order:*
// ==========================================================

export const deleteCacheByPattern = async (pattern) => {

    try {

        const keys = [];

        // البحث عن المفاتيح بدون التأثير على الأداء
        for await (const key of redisClient.scanIterator({
            MATCH: pattern
        })) {

            keys.push(key);

        }

        // حذف المفاتيح إذا وجدت
        if (keys.length > 0) {

            await redisClient.del(...keys);

        }

    } catch (error) {

        console.error("Cache Pattern Delete Error:", error);

    }

};


// ==========================================================
// التحقق هل المفتاح موجود
// ==========================================================

export const hasCache = async (key) => {

    try {

        return await redisClient.exists(key);

    } catch (error) {

        console.error("Cache Exists Error:", error);

        return false;

    }

};


// ==========================================================
// تحديث مدة انتهاء الـ Cache
// ==========================================================

export const expireCache = async (key, ttl) => {

    try {

        await redisClient.expire(key, ttl);

    } catch (error) {

        console.error("Cache Expire Error:", error);

    }

};


// ==========================================================
// حذف جميع بيانات Redis
// يستخدم أثناء التطوير فقط
// ==========================================================

export const clearCache = async () => {

    try {

        await redisClient.flushAll();

    } catch (error) {

        console.error("Cache Clear Error:", error);

    }

};