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

インポートされたファイル群

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

ShishaSystem_Root.prefabをシーンに配置

## 3. Prefabの配置

`Assets/mikinel/Shisha/Prefabs/Basic` のフォルダ内にあるPrefabがBasicモードで使用するシーシャ本体のPrefabです。

2で配置したShishaSystem_Rootの子階層に配置を行います。

パイプが1本のもの、2本のもの、アイスホースのものなどの種類があります。

数種類ありますので、お好みのものを配置してください。

![様々な種類のシーシャ本体のPrefab](/img/notion/basic/figure-03.png)

様々な種類のシーシャ本体のPrefab

![シーシャ本体を配置した様子](/img/notion/basic/figure-04.png)

シーシャ本体を配置した様子

`Assets/mikinel/Shisha/Prefabs/Flavor` のフォルダ内にフレーバボトルのPrefabがあります。

こちらもお好みで配置してください。

こちらも2で配置したShishaSystem_Rootの子階層に配置を行います。

![様々な種類のフレーバのPrefab](/img/notion/basic/figure-05.png)

様々な種類のフレーバのPrefab

![フレーバを配置した様子](/img/notion/basic/figure-06.png)

フレーバを配置した様子

フレーバには吐く煙の色が設定可能です。

色を変更したい場合は配置したフレーバを選択し、InspectorWindow内のFlavorServerコンポーネント値を編集します。

![FlavorServerコンポーネント](/img/notion/basic/figure-07.png)

FlavorServerコンポーネント

FlavorColorTypeを切り替えることで、1色、2色グラデーションの切り替えが可能です。

![SingleモードとGradientモード](/img/notion/basic/figure-08.png)

SingleモードとGradientモード

## 4. 動作確認、アップロード

フレーバを本体に当てることで色の変更、パイプをUseすることで、シーシャを吸うことができるようになります。

![フレーバを当てた時の様子](/img/notion/basic/figure-09.png)

フレーバを当てた時の様子

![シーシャを吸ったときの様子](/img/notion/basic/figure-01.png)

シーシャを吸ったときの様子

:::tip[ヒント]

明るいワールドよりも暗いワールドの方が煙が映えます

:::
