package com.tlteletix.pro
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.app.NotificationChannel
import android.app.NotificationManager
import android.media.RingtoneManager
import android.net.Uri
import android.os.Build
import androidx.annotation.RequiresApi

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Teletix"
    @RequiresApi(Build.VERSION_CODES.M)

    override fun onCreate(savedInstanceState: Bundle?) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

        val notificationManager = getSystemService(NotificationManager::class.java)

        val defaultChannel =  NotificationChannel("default_channel", "Default", NotificationManager.IMPORTANCE_HIGH)

        defaultChannel.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION), null)
        notificationManager.createNotificationChannel(defaultChannel)

        val accon = NotificationChannel("1", "Acc On", NotificationManager.IMPORTANCE_HIGH)
        accon.setSound(Uri.parse("android.resource://$packageName/raw/accon"),null)
        notificationManager.createNotificationChannel(accon)

        val accoff = NotificationChannel("2", "Acc Off", NotificationManager.IMPORTANCE_HIGH)
        accoff.setSound(Uri.parse("android.resource://$packageName/raw/accoff"),null)
        notificationManager.createNotificationChannel(accoff)

        val geofencein = NotificationChannel("28", "Geofence In", NotificationManager.IMPORTANCE_HIGH)
        geofencein.setSound(Uri.parse("android.resource://$packageName/raw/geofencein"),null)
        notificationManager.createNotificationChannel(geofencein)

        val geofenceout = NotificationChannel("29", "Geofence Out", NotificationManager.IMPORTANCE_HIGH)
        geofenceout.setSound(Uri.parse("android.resource://$packageName/raw/geofenceout"),null)
        notificationManager.createNotificationChannel(geofenceout)

        val immobilizeron = NotificationChannel("immobilizeron", "Immobilizer On", NotificationManager.IMPORTANCE_HIGH)
        immobilizeron.setSound(Uri.parse("android.resource://$packageName/raw/immobilizeron"),null)
        notificationManager.createNotificationChannel(immobilizeron)

        val immobilizeroff = NotificationChannel("immobilizeroff", "Immobilizer Off", NotificationManager.IMPORTANCE_HIGH)
        immobilizeroff.setSound(Uri.parse("android.resource://$packageName/raw/immobilizeroff"),null)
        notificationManager.createNotificationChannel(immobilizeroff)

        val overspeed = NotificationChannel("21", "Over Speed", NotificationManager.IMPORTANCE_HIGH)
        overspeed.setSound(Uri.parse("android.resource://$packageName/raw/overspeed"),null)
        notificationManager.createNotificationChannel(overspeed)

        val poweroff = NotificationChannel("19", "Power Off", NotificationManager.IMPORTANCE_HIGH)
        poweroff.setSound(Uri.parse("android.resource://$packageName/raw/poweroff"),null)
        notificationManager.createNotificationChannel(poweroff)

        super.onCreate(savedInstanceState)
        } else {
            TODO("VERSION.SDK_INT < O")
        }
    }
  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
