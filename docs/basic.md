---
id: basic
title: 導入方法（Basic モード）
sidebar_label: 導入方法（Basic モード）
description: Basic モードのインポート、Prefab の配置、煙の色の設定と動作確認。
---

## 1. UnityPackageのインポート

UnityPackageをワールドのプロジェクト内にインポートします。

mikinel Shisha Systemは`Assets/mikinel` 内にインポートされます。

![インポートされたファイル群](/img/notion/basic/figure-10.png)

<p class="image-caption">インポートされたファイル群</p>

:::tip[ヒント]

BasicモードのShishaが配置されたサンプルシーンは`Assets/mikinel/Shisha/ShishaDemo_Basic.unity` にあります。

:::

## 2. ルートオブジェクトの配置

まず、`Assets/mikinel/Shisha/Prefabs/ShishaSystem_Root.prefab` をシーンに配置します。

:::warning[注意]

mikinel Shisha Systemでは、ShishaSystem_Root.prefabを先に配置してから、その子階層にシーシャに関連するPrefabを配置していく必要があります。
この配置にしなかった場合、正常にギミックが動作しません。

:::

![ShishaSystem_Root.prefabをシーンに配置](/img/notion/basic/figure-02.png)

<p class="image-caption">ShishaSystem_Root.prefabをシーンに配置</p>

## 3. Prefabの配置

`Assets/mikinel/Shisha/Prefabs/Basic` のフォルダ内にあるPrefabがBasicモードで使用するシーシャ本体のPrefabです。

2で配置したShishaSystem_Rootの子階層に配置を行います。

パイプが1本のもの、2本のもの、アイスホースのものなどの種類があります。

数種類ありますので、お好みのものを配置してください。

![様々な種類のシーシャ本体のPrefab](/img/notion/basic/figure-03.png)

<p class="image-caption">様々な種類のシーシャ本体のPrefab</p>

![シーシャ本体を配置した様子](/img/notion/basic/figure-04.png)

<p class="image-caption">シーシャ本体を配置した様子</p>

`Assets/mikinel/Shisha/Prefabs/Flavor` のフォルダ内にフレーバボトルのPrefabがあります。

こちらもお好みで配置してください。

こちらも2で配置したShishaSystem_Rootの子階層に配置を行います。

![様々な種類のフレーバのPrefab](/img/notion/basic/figure-05.png)

<p class="image-caption">様々な種類のフレーバのPrefab</p>

![フレーバを配置した様子](/img/notion/basic/figure-06.png)

<p class="image-caption">フレーバを配置した様子</p>

フレーバには吐く煙の色が設定可能です。

色を変更したい場合は配置したフレーバを選択し、InspectorWindow内のFlavorServerコンポーネント値を編集します。

![FlavorServerコンポーネント](/img/notion/basic/figure-07.png)

<p class="image-caption">FlavorServerコンポーネント</p>

- **FlavorColorType**：1色とグラデーション色を切り替えます。
- **FirstColor**：1色目の色を設定します。
- **SecondColor**：グラデーション時の2色目の色を設定します。
- **Smoke Density Multiplier**：煙の濃さを設定します。

![FlavorServerの色と煙の濃さの設定](/img/notion/basic/figure-08.png)

<p class="image-caption">FlavorServerの色と煙の濃さの設定</p>

## 4. 動作確認、アップロード

フレーバを本体に当てることで色の変更、パイプをUseすることで、シーシャを吸うことができるようになります。

![フレーバを当てた時の様子](/img/notion/basic/figure-09.png)

<p class="image-caption">フレーバを当てた時の様子</p>

![シーシャを吸ったときの様子](/img/notion/basic/figure-01.png)

<p class="image-caption">シーシャを吸ったときの様子</p>

:::tip[ヒント]

明るいワールドよりも暗いワールドの方が煙が映えます

:::
